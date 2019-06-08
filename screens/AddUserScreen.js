import React from 'react'
import {TouchableOpacity, View, ScrollView, Image,Picker, Text, Alert, AsyncStorage} from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import query from "../database/query";
import {ID} from "../constants/Unique";
import {checkDataTable} from "../constants/Data_to_update";

class LogoTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Image
                        source={require('../assets/images/iconut.png')}
                        style={{marginHorizontal: 5, width: 40, height: 40}}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>Tambah User</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 10, fontWeight: '100',}}>member of </Text>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>ASTRA</Text>
                    </View>

                </View>
            </View>
        )
    }
}

export default class AddUserScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        // title: "United Tractor",
        return {
            headerTitle: <LogoTitle navigation={navigation}/>,
            headerStyle: {backgroundColor: "#FEDA01"}
        }
    };
    success = false;
    err = null;
    state = {
        name: '',
        nrp: '',
        lahir: '',
        level:'',
    };
    levelOptions = ['SPV','MEKANIK'];
    save = async () => {
        if (this.state.nrp !== '' && this.state.level !== '') {
            await query(`SELECT id
                     FROM users
                     WHERE nrp= ? `, [this.state.nrp])
                .then(async res => {
                    //generate new id
                    let user_id = ID();
                    //if found
                    if (res.length > 0) {
                        //replace generated id with existing id
                        user_id = res[0].id;
                    }
                    //insert or replace with kind_unit_id
                    await query(`INSERT OR
                             REPLACE
                             INTO users(id, name,nrp,lahir,level)
                             VALUES (?, ?, ?,?,?);`, [user_id, this.state.name,this.state.nrp,this.state.lahir,this.state.level.toLowerCase()])
                        .then(() => {
                            Alert.alert('Success', 'Data berhasil tersimpan')
                            this.props.navigation.goBack();
                        });

                    if (this.props.screenProps.isConnected) {
                        await checkDataTable('users').then(console.log('synced users'));
                    }


                });
        }
    }

    render() {

        return (
            <ScrollView>
                <View style={{flex: 1, flexDirection: 'column', padding: 15}}>
                    <View>
                        <Text>Akun untuk: </Text>
                        <Picker
                            selectedValue={this.state.level}
                            onValueChange={value => {
                                this.setState({level:value})
                            }
                            }>
                            {
                                this.levelOptions.map((level, key) => (
                                    <Picker.Item key={key} label={level}
                                                 value={level}/>
                                ))
                            }
                        </Picker>
                    </View>

                    <TextInput mode="outlined" value={this.state.name}
                               onChangeText={(value) => this.setState({name: value})} placeholder="Nama"/>
                    <TextInput mode="outlined" value={this.state.nrp}
                               onChangeText={(value) => this.setState({nrp: value})} placeholder="NRP"/>
                    <TextInput mode="outlined" value={this.state.lahir}
                               onChangeText={(value) => this.setState({lahir: value})} placeholder="Tanggal Lahir"/>

                    <Button style={{margin: 15}} mode="contained" onPress={() => {
                        this.save();
                    }
                    }>Tambah User</Button>
                </View>
            </ScrollView>
        )
    }
}