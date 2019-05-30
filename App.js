import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Alert, AsyncStorage, NetInfo} from 'react-native';
import {AppLoading, Asset, Font, Icon, SQLite} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper'
import {useScreens} from 'react-native-screens';
import {createTableOffline, initMasterTable, secondPartTableOffline, syncMasterData} from './constants/Default_tables'
import user from './constants/UserController'
import {checkDataTable} from "./constants/Data_to_update";
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
    };

    constructor(props) {
        super(props);
    }

    //create main table,
    //@TODO: make data sync from firebase
    componentDidMount() {
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
            await initMasterTable()
                .then(() => {
                    syncMasterData().then(async () => {
                        // user.sync(this.state.connection);
                        await checkDataTable('users').then(console.log('synced users'))
                        await checkDataTable('units').then(console.log('synced users'))
                        await checkDataTable('unit_users').then(console.log('synced unit_users'))
                        await checkDataTable('kind_units').then(console.log('synced kind_units'))
                        await checkDataTable('kind_unit_zones').then(console.log('synced kind_unit_zones'))
                        await checkDataTable('group_kind_unit_zones').then(console.log('synced group_kind_unit_zones'))


                    })
                });
            const userToken = await AsyncStorage.getItem('userToken');
            if (!userToken) {
                await createTableOffline().then(() => {
                    secondPartTableOffline();
                })
            }

        }
        else {
            Alert.alert('Koneksi Gagal','Gagal terkoneksi dengan internet. Periksa kembali konektifitas anda')
        }

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
                        <AppNavigator screenProps={{isConnected: this.state.connection}}/>
                    </View>
                </PaperProvider>
            )
        }
    }

    _loadResourcesAsync = async () => {
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
