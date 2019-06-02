import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Alert, AsyncStorage, NetInfo} from 'react-native';
import {AppLoading, Asset, Font, Icon, Notifications,Permissions} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper'
import {useScreens} from 'react-native-screens';
import {createTableOffline, initMasterTable, secondPartTableOffline, syncMasterData} from './constants/Default_tables'
import {checkDataTable} from "./constants/Data_to_update";
import SyncLoadingScreen from "./screens/SyncLoadingScreen";
import LoadingDialog from "./components/LoadingDialog";
useScreens();
const primaryTheme = {
    ...DefaultTheme,
    // roundness:2,
    colors: {
        ...DefaultTheme.colors,
        accent: "#FEDA01",
        primary: "#616161"
    }
};

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        connection: false,
        sync:false,
        syncMessage:''
    };

    constructor(props) {
        super(props);
    }

    syncLocalData = async () => {
        await checkDataTable('users').then(this.setState({syncMessage:'Synchronizing Users'}));
        await checkDataTable('units').then(this.setState({syncMessage:'Synchronizing  Units'}));
        await checkDataTable('unit_users').then(this.setState({syncMessage:'Synchronizing  Periodic Inspections'}));
        await checkDataTable('kind_units').then(this.setState({syncMessage:'Synchronizing  Periodic Inspections'}));
        await checkDataTable('kind_unit_zones').then(this.setState({syncMessage:'Synchronizing  Periodic Inspections'}));
        await checkDataTable('group_kind_unit_zones').then(this.setState({syncMessage:'Synchronizing  Periodic Inspections'}))
    };

    //create main table,
    //@TODO: make data sync from firebase
    componentDidMount() {
        Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleConnectionChange
        );
    }

    componentWillUnmount() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleConnectionChange
        );
    }

    handleConnectionChange = async isConnected => {
        this.setState({
            connection: isConnected,
        });

        if (isConnected) {
            this.setState({sync:true});
            this._dismissAllNotification();
            const beingUsed = await AsyncStorage.getItem('isUsed');
            if (!beingUsed) {
                this.setState({syncMessage:'Initialize first launch'})
            }
            await initMasterTable()
                .then(async () => {
                    //async when data connected
                    await this.syncLocalData();
                    await syncMasterData();
                    await this.setState({sync:false,syncMessage:''})
                });
            const userToken = await AsyncStorage.getItem('userToken');
            if (!userToken) {
                await createTableOffline().then(() => {
                    secondPartTableOffline();
                })
            }

        } else {
            await this._presentLocalNotificationAsync();
            Alert.alert('Fail Connection', 'Can\'t reach internet at the moment. You\'re in Offline Mode')
        }

    };

    _presentLocalNotificationAsync = async () => {
        await this._obtainUserFacingNotifPermissionsAsync();
        Notifications.presentLocalNotificationAsync({
            title: 'Alert',
            body: 'Anda pada mode OFFLINE',
            data: {
                hello: 'there',
            },
            ios: {
                sound: true,
            },
            android: {
                vibrate: true,
                sticky:true,
            },

        })
    };
    _dismissAllNotification = async ()=>{
       await Notifications.dismissAllNotificationsAsync()
    };
    _obtainUserFacingNotifPermissionsAsync = async () => {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert(`We don't have permission to present notifications.`);
            }
        }
        return permission;
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <PaperProvider theme={primaryTheme}>
                    <View style={styles.container}>

                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        {
                            this.state.sync?<LoadingDialog visible={this.state.sync} message={this.state.syncMessage}/>:
                            <AppNavigator screenProps={{isConnected: this.state.connection}}/>
                        }
                    </View>
                </PaperProvider>
            )
        }
    }

    _loadResourcesAsync = async () => {
        //set queuePhoto
        return Promise.all([
            Asset.loadAsync([
                // require('./assets/images/robot-dev.png'),
                // require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
