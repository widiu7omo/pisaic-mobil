import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { 
    ActivityIndicator,
    Platform,
    Text, 
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,} from 'react-native';
/*eslint-disable */
export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.items=[];
    }
    render(){
        return (
        <View style = { styles.container }>
            <View style = {styles.input}>
                <View>
                    <Text style ={{fontSize:70,textAlign:'center'}}>PISAIC</Text>
                </View>
                <TextInput
                style = {styles.inputField} 
                mode="outlined"
                label="Username"
                ></TextInput> 
                <TextInput 
                mode="outlined"
                label="Password"
                ></TextInput> 
                <View style={{alignItems:'flex-end',flexDirection:'row',marginTop:20}}>
                    <Button style={{marginRight:20}} mode="contained" onPress={this._signInAsync}>Login</Button>
                    <Button mode="contained" onPress={()=>this.props.navigation.navigate('Main')}>Register</Button>
                </View>
            </View>
        </View>
        );
    }
    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
      };
}
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        // backgroundColor:'rgba(255,255,255,1)',
        // justifyContent:'center',
        // alignItems:'center',
        flexDirection:'column',
        padding:20
    },
    input:{
        justifyContent:'center',
        // alignItems:'center',
        flexGrow:1
    },
    inputField:{
        marginVertical:10,
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

