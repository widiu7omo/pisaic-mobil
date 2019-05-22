import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Text} from 'react-native';
import {AppLoading, Asset, Font, Icon, SQLite} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import query from './database/query';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper'
import {useScreens} from 'react-native-screens';
import defaultInput from './constants/Default_z1inputs'
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

    componentDidMount() {
        this.createTable();
    }

    createTable = async () => {
        await query(`create table if not exists units
                     (
                         unit_id integer primary key autoincrement not null,
                         name    varchar
                     );`, []).then(() => console.log('unit created'));
        await query(`create table if not exists users
                     (
                         user_id integer primary key autoincrement not null,
                         name    varchar,
                         nrp     varchar,
                         lahir   varchar
                     );`, []).then(() => console.log('user created'));
        await query(`create table if not exists pisheets
                     (
                         id           integer primary key autoincrement not null,
                         unit_id      integer,
                         masterlog_id integer
                     );`, []).then(() => console.log('pisheets created'));
        await query(`create table if not exists zone1s
                     (
                         id         integer primary key autoincrement not null,
                         pisheet_id integer
                     );`, []).then(() => console.log('zone 1 created'));
        await query(`create table if not exists bucketgroups
                     (
                         id          integer primary key autoincrement not null,
                         input_items text,
                         zone1_id    integer
                     );`, []).then(() => console.log('bucketgroup created'));
        await query(`delete
                     from bucketgroups`);
        await query(`insert into bucketgroups
                     values (null,?,?)`,[defaultInput.z1a,1]).then(()=>console.log('a group inserted'));
        await query(`delete
                     from users`);
        await query(`insert into users
                     values (null, "AHMAD FIRLI", "80112116", "14031990"),
                            (null, "BAKHTIAR RIFAI", "82102014", "12061982"),
                            (null, "DWI HINDHARYA P", "82107126", "29091986"),
                            (null, "FERIANUS", "82107080", "15061985"),
                            (null, "GUNAIDY", "80112121", "15011991"),
                            (null, "MUH. AGUS ROMI", "80107179", "14061983"),
                            (null, "MUH. YASIN", "80107232", "07031987"),
                            (null, "RUSWANTO", "80107138", "17061984"),
                            (null, "WAHYUDI", "80110206", "16041988"),
                            (null, "YUDHA PRAWIRA ", "80110207", "20111989"),
                            (null, "ZAINURI", "80110259", "08061990");
        `, []).then(() => console.log('account inserted'));
        await query(`delete
                     from units`);
        await query(`insert into units
                     values (null, 'SE 3001'),
                            (null, 'SE 3002'),
                            (null, 'SE 3003'),
                            (null, 'SE 3004'),
                            (null, 'SE 3005'),
                            (null, 'SE 3006'),
                            (null, 'SE 3007');`, []).then(() => console.log('unit inserted'));
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
                        <AppNavigator/>
                    </View>
                </PaperProvider>
            )
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
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
