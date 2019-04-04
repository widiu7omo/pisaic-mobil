import React from 'react'
import { Component, View,StyleSheet,ScrollView, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'

export default class Workorder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date:"20-12-2019"
        }
    }
    render(){
        return (
            <View style={styles.container}>
            {/* bring your input here */}
                {/* <Text>This is from workorder</Text> */}
                <ScrollView style={styles.inputField}>
                    <DatePicker
                    date={this.state.date}
                    format="DD-MM-YYYY"
                    placeholder="Pilih tanggal"
                    showIcon={false}
                    onDateChange={(date)=> {this.setState({date:date})}}/>
                    <TextInput label="WO No." mode="outlined"></TextInput>
                    <TextInput label="Refisi SR" mode="outlined"></TextInput>
                    <TextInput label="PO Cust." mode="outlined"></TextInput>
                    <TextInput label="Product Name" mode="outlined"></TextInput>
                    <TextInput label="Model Unit/ Equipment No." mode="outlined"></TextInput>
                    <TextInput label="Model Engine/ Equipment No." mode="outlined"></TextInput>
                    <TextInput label="Estimasi Pekerjaan" mode="outlined"></TextInput>
                    <TextInput label="Catatan" mode="outlined" style={{height:400}}></TextInput>
                </ScrollView>
            </View>
        )
    }    
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    inputField:{
        flexDirection:'column',
        padding:10,
    }
})