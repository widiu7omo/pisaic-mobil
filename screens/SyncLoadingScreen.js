import React, {Component} from "react"
import {View,Text,StyleSheet} from "react-native";
import {ActivityIndicator} from 'react-native-paper'
import {normalize} from "../constants/FontSize";

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#F5FCFF88',

    },
    loadingText:{
        marginTop:20,
        fontSize:normalize(15),
        fontWeight: '200',
    }

});

export default class SyncLoadingScreen extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (<View style={styles.container}>
            <ActivityIndicator/>
            <Text style={styles.loadingText}>{this.props.message}</Text>
        </View>)
    }
}