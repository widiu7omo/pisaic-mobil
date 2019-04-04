import React from 'react'
import { Component,View,Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { ViewPagerAndroid } from 'react-native-gesture-handler';

export default class IndexScreen extends React.Component{
    constructor(){
        super(); 
        this.submenus = [
                {name:'Workorder & Others',screen:'Workorder'},
                {name: 'Dataunit',screen:'Dataunit'},
                {name: 'Zone 1: Front Attachment & Track Group', screen: 'Zone1'},
                {name: 'Zone 2: Upper Front, Central Frame & Motor Area',screen:'Zone2'},
                {name: 'Zone 3: Upper Rear Area - Cabin & Motor Container',screen: 'Zone3'}
            ]
    }
    render(){
        return(
            <View style={styles.container}>
            {
                this.submenus.map((submenu,key) =>(
                    <View key={key} style={styles.submenu}>
                        <Button style={styles.menuButton} mode="outlined" onPress={() =>this.props.navigation.navigate(submenu.screen)}>{submenu.name}</Button>
                    </View>
                ))
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    submenu:{
        flexDirection:'column',
        padding:10
    },
})