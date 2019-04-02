import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import MainTabNavigator from '../navigation/MainTabNavigator';

import { AppRegistry, View, ScrollView, StyleSheet, Text, Platform } from 'react-native';
export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.items=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    render(){
    
        return (
        <View style = { styles.container }>
            <View style = {styles.input}>
                <View
                >
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
                <View style={{alignItems:'flex-end',marginTop:20}}>
                    <Button mode="contained" onPress={()=>MainTabNavigator}>Login</Button>
                </View>
            </View>

            
        </View>
        );
    }
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

