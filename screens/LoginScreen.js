import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {
    Platform,
    Text,
    Alert,
    AsyncStorage,
    StyleSheet,
    View, Image
} from 'react-native';
import Colors from "../constants/Colors";
import {normalize} from "../constants/FontSize";
import query from '../database/query'
import {checkDataTable} from "../constants/Data_to_update";
import KeyboardShift from "../components/KeyboardShift";
/*eslint-disable */
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <KeyboardShift>
                {
                    () => (<View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.containerHeader}>
                                <Image style={styles.logoHeader} source={require('../assets/images/iconut.png')}/>
                                <Text style={{padding: 5, fontSize: normalize(12), fontWeight: '500'}}>UNITED
                                    TRACTORS</Text>
                            </View>
                            <View style={styles.containerHeader}>
                                <Image source={require('../assets/images/polman.png')} style={styles.logoHeader}/>
                                <Text style={{
                                    color: 'blue',
                                    padding: 5,
                                    fontSize: normalize(12),
                                    fontWeight: '500'
                                }}>POLMAN </Text>
                                <Text style={{
                                    color: 'red',
                                    padding: 5,
                                    paddingLeft: 0,
                                    margin: 0,
                                    fontSize: normalize(12),
                                    fontWeight: '500'
                                }}>ASTRA</Text>
                            </View>
                        </View>
                        <View style={styles.input}>
                            <View style={{marginBottom: 50}}>
                                <Text style={styles.logoTitle}>PISAIC</Text>
                            </View>
                            <View style={{}}>
                                <TextInput value={this.state.username}
                                           onChangeText={(username) => this.setState({username})}
                                           style={styles.inputField}
                                           mode="flat"
                                           label="Username"
                                />
                            </View>
                            <View>
                                <TextInput value={this.state.password}
                                           secureTextEntry={true}
                                           style={styles.inputField}
                                           onChangeText={(password) => this.setState({password})}
                                           mode="flat"
                                           label="Password"
                                />
                            </View>

                            <View style={{alignItems: 'flex-end', flexDirection: 'row', marginTop: 20}}>
                                <Button style={{marginRight: 20}} mode="contained"
                                        onPress={this._signInAsync}>Login</Button>
                                <Button mode="contained"
                                        onPress={() => this.props.navigation.navigate('Main')}>Register</Button>
                            </View>
                        </View>
                    </View>)
                }

            </KeyboardShift>
        );
    }

    _signInAsync = async () => {
        const connected = this.props.screenProps.isConnected;
        if (connected) {
            await checkDataTable('users');
        }
        await query('SELECT * FROM users where users.nrp = ? AND users.lahir = ?', [this.state.username, this.state.password])
            .then(res => {
                if (res.length > 0) {
                    AsyncStorage.setItem('userToken', 'abc');
                    AsyncStorage.setItem('isUsed', 'yeyeye');
                } else Alert.alert('Login Gagal', 'Periksa Kembali username dan password anda')
            });

        this.props.navigation.navigate('AuthLoading');
    };
}
const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            paddingTop: (Platform.OS === 'ios') ? 20 : 0,
            backgroundColor: Colors.primaryColor,
            // justifyContent:'center',
            // alignItems:'center',
            flexDirection: 'column',
            padding: 20
        },
    logoHeader: {height: 30, width: 30},
    containerHeader: {
        flexDirection: 'row',
    },
    header: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoTitle: {
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 4,
        borderWidth: 3,
        borderColor: '#000',
        fontSize: 70,
        textAlign: 'center'
    },
    input: {
        justifyContent: 'center',
        // alignItems:'center',
        flexGrow: 1
    },
    inputField: {
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginTop: 0
    },
    separator:
        {
            height: 2,
            backgroundColor: 'rgba(3,255,9,0.5)',
            width: '100%'
        },

    text:
        {
            fontSize: 18,
            color: 'black',
            padding: 15
        }

});

