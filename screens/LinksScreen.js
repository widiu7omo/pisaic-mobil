import React from 'react';
import { Button } from 'react-native-paper';
import { AppRegistry, View, ScrollView, StyleSheet, Text, Platform } from 'react-native';
export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.items=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    static navigationOptions = {
        title: 'app.json',
      };
    render(){
        return (
        <View style = { styles.container }>
            <ScrollView>
                {
                    this.items.map(( item, key ) =>
                    (
                        <View key = { key } style = { styles.item }>
                            <Text style = { styles.text }>{ item }</Text>
                            <View style = { styles.separator }/>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    
    separator:
    {
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%'
    },
    
    text:
    {
        fontSize: 18,
        color: 'black',
        padding: 15
    }
        
});

