import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {
    Platform,
    Text,
    Alert,
    AsyncStorage,
    StyleSheet,
    View, Image,
    ImageBackground,
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
                    () => (
                        <View style={styles.container}>
                            <ImageBackground
                                resizeMode={'cover'}
                                style={{flex: 1, padding: 20}}
                                source={require('../assets/images/login-screen.jpg')}
                            >
                                <View style={styles.header}>
                                    <View style={styles.containerHeader}>
                                        <Image style={styles.logoHeader}
                                               source={require('../assets/images/iconut.png')}/>
                                        <View style={{flexDirection: 'column', padding: 5}}>
                                            <Text style={{fontSize: normalize(12), fontWeight: '500'}}>UNITED
                                                TRACTORS</Text>
                                            <View style={{flexDirection: 'row', margin: 0}}>
                                                <Text style={{fontSize: normalize(9), color: "#1475B2"}}>member
                                                    of </Text>
                                                <Text style={{
                                                    fontWeight: '800',
                                                    fontSize: normalize(9),
                                                    color: "#1475B2"
                                                }}>ASTRA</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={styles.containerHeader}>
                                        <Image source={require('../assets/images/polman.png')}
                                               style={styles.logoHeader}/>
                                        <Text style={{
                                            color: 'red',
                                            padding: 5,
                                            fontSize: normalize(12),
                                            fontWeight: '500'
                                        }}>POLMAN </Text>
                                        <Text style={{
                                            color: 'blue',
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
                                        <Button style={{
                                            marginRight: 20,
                                            backgroundColor: Colors.primaryColor,
                                            textColor: Colors.darkColor
                                        }} mode="contained"
                                                onPress={this._signInAsync}>Login</Button>
                                        {/*<Button mode="contained"*/}
                                        {/*        onPress={() => this.props.navigation.navigate('Main')}>Register</Button>*/}
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    )
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
                    AsyncStorage.setItem('level', res[0].level);
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

        },
    logoHeader: {height: 35, width: 35},
    containerHeader: {
        flexDirection: 'row',
    },
    header: {
        marginTop: 35,
        padding: 10,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryColor,
    },
    logoTitle: {
        marginLeft: 60,
        marginRight: 60,
        // borderRadius: 4,
        // borderWidth: 3,
        borderColor: '#000',
        borderRadius:4,
        fontSize: 70,
        backgroundColor: Colors.primaryColor,
        fontWeight: '800',
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

