import React from 'react';
import {
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import query from "../database/query";
import defaultInput from "../constants/Default_z1inputs";

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        //create master data if isUsed not yet been set,
        //if not, it will return to bootstrapAsync
        this._createMasterData().then(() => {
            this._bootstrapAsync()
        });
    }

    _createMasterData = async () => {
        const beingUsed = await AsyncStorage.getItem('isUsed');
        console.log(beingUsed);
        if (beingUsed) {
            return;
        }
        await query(`create table if not exists pisheets
                     (
                         id      integer primary key autoincrement not null,
                         unit_id integer
                     );`, []).then(() => console.log('pisheets created'));
        await query(`create table if not exists zone1s
                     (
                         id         integer primary key autoincrement not null,
                         pisheet_id integer
                     );`, []).then(() => console.log('zone 1 created'));
        await query(`create table if not exists zone2s
                     (
                         id         integer primary key autoincrement not null,
                         pisheet_id integer
                     );`, []).then(() => console.log('zone 2 created'));
        await query(`create table if not exists zone3s
                     (
                         id         integer primary key autoincrement not null,
                         pisheet_id integer
                     );`, []).then(() => console.log('zone 3 created'));
        await query(`select * from units`, []).then( async results => {
            let param = [];
            await query(`delete from pisheets`).then(()=>console.log('delete pisheets'))
            await results.forEach( result => {
                const q = "insert into pisheets values (null,?)";
                param.push(result.id);
                query(q, param);
                param = [];
            })
        }).then(()=>console.log('insert batch to pisheets'));
        await query(`create table if not exists z1a
                     (
                         id          integer primary key autoincrement not null,
                         input_items text,
                         zone1_id    integer
                     );`, []).then(() => console.log('zone1a created'));
        await query(`create table if not exists z1b
                     (
                         id          integer primary key autoincrement not null,
                         input_items text,
                         zone1_id    integer
                     );`, []).then(() => console.log('zone1b created'));

        await query(`delete
                     from z1a`);
        await query(`insert into z1a
                     values (null, ?, ?)`, [defaultInput.z1a, 1]).then(() => console.log('z1a inserted'));
        await query(`delete
                     from z1b`);
        await query(`insert into z1b
                     values (null, ?, ?)`, [defaultInput.z1b, 1]).then(() => console.log('z1b inserted'));

    }
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        // This will switch to the Main screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});