import React from 'react'
import { Component, View,StyleSheet,ScrollView, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'

export default class DataunitScreen extends React.Component{
    //ganti nama class nya sesuai dengan nama file jsnya
    constructor(props){
        super(props);
        this.state = {
            //ganti file state di bawah ini sesuai dengan nama inputannya, disingkat aj kddp
            date:"20-12-2019",
            location:'',
            snunit:'',
            smrunit:'',
            smrtravel:'',
            kwhmeter:'',
            start:'',
            finis:'',
        };
        this.submenus = [        
            {name:'Operator',screen:'Btnoperator'},
            {name: 'Mechanic',screen:'Btnmekanik'},
            {name: 'Supervisor', screen: 'Btnspv'}
        ]
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
                    onDateChange={(date)=>{this.setState({date:date})}}/>
                    {/* ganti ini this.state. nama statenya, on change , this.setState, sama labelnya. */}
                    <TextInput value={this.state.location} onChangeText={(location) => this.setState({location})} label="Location" mode="outlined"/>

                    <TextInput value={this.state.snunit} onChangeText={(snunit) => this.setState({snunit})} label="SN Unit" mode="outlined"/>

                    <TextInput value={this.state.smrunit} onChangeText={(smrunit) => this.setState({smrunit})} label="SMR Unit" mode="outlined"/>

                    <TextInput value={this.state.smrtravel} onChangeText={(smrtravel) => this.setState({smrtravel})} label="SMR Travel" mode="outlined"/>

                    <TextInput value={this.state.kwhmeter} onChangeText={(kwhmeter) => this.setState({kwhmeter})} label="KWH Meter" mode="outlined"/>

                    <TextInput value={this.state.start} onChangeText={(start) => this.setState({start})} label="Start" mode="outlined"/>

                    <TextInput value={this.state.finis} onChangeText={(finis) => this.setState({finis})} label="Finish" mode="outlined"/>
                    {/* {
                        this.submenus.map((submenu,key) =>(
                        <View key={key} style={styles.submenu}>
                            <Button style={styles.menuButton} mode="outlined" onPress={() =>this.props.navigation.navigate(submenu.screen)}>{submenu.name}</Button>
                        </View>
                        ))
                    } */}
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
    },
    submenu:{
        flexDirection:'column',
        padding:8
    },
    menuButton:{
        flexDirection:'row'
    }
});