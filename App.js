import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Text, AsyncStorage} from 'react-native';
import {AppLoading, Asset, Font, Icon, SQLite} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper'
import {useScreens} from 'react-native-screens';
// import {initializeData, initializeDB} from "./constants/Default_initialize_db";
import downloadDb from './database/connection'
import {initializeData} from "./constants/Default_initialize_db";
// import {createTableMaster} from './constants/Default_tables'

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
    };
    //@TODO: make data sync from firebase

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
                        <AppNavigator/>
                    </View>
                </PaperProvider>
            )
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            //create table first
            await downloadDb(),
            // await query.openExistDB(),
            // await initializeData(),
            // await createTableMaster();
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
