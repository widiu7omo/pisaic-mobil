import React from 'react';
import {Component,View,Text,StyleSheet} from 'react-native';
import CustomHeader from "../../components/CustomHeader";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:20,
        fontWeight: "500"
    }
})
export default class MaintainScreen extends React.Component{
    constructor(props){
        super(props);

    }
    static navigationOptions = {
        headerTitle: <CustomHeader headerName="title"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Under Development</Text>
            </View>
        )
    }
}