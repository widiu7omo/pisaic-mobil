import React from 'react'
import {TouchableOpacity, View, ScrollView, Image, Text, Alert, AsyncStorage} from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import user from "../constants/UserController"

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
        lahir: ''
    };

    save(newUser) {
        console.log(this.props.screenProps);
        console.log(newUser);
        user.insert(newUser,this.props.screenProps.isConnected).then(() => {
            this.success = true;
            Alert.alert("Success", "User berhasil ditambahkan",
                [{
                    text: 'OK', onPress: () => {
                        this.props.navigation.navigate('User')
                    }
                }]);
        }).catch(err => {
            console.log('fail', err);
            this.err = err;
            this.success = false;
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={{flex: 1, flexDirection: 'column', padding: 15}}>
                    {
                        this.success ?
                            Alert.alert("Success", "User berhasil ditambahkan",
                                [{
                                    text: 'OK', onPress: () => {
                                        return null
                                    }
                                }]) :
                            (this.err !== null ? Alert.alert("Failed", this.err, [{
                                text: 'OK', onPress: () => {
                                    return null
                                }
                            }]) : null)
                    }
                    <TextInput mode="outlined" value={this.state.name}
                               onChangeText={(value) => this.setState({name: value})} placeholder="Nama"/>
                    <TextInput mode="outlined" value={this.state.nrp}
                               onChangeText={(value) => this.setState({nrp: value})} placeholder="NRP"/>
                    <TextInput mode="outlined" value={this.state.lahir}
                               onChangeText={(value) => this.setState({lahir: value})} placeholder="Tanggal Lahir"/>

                    <Button style={{margin: 15}} mode="contained" onPress={() => {
                        console.log(this.state);
                        this.save(this.state);
                    }
                    }>Tambah User</Button>
                </View>
            </ScrollView>
        )
    }
}