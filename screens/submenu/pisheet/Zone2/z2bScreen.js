import React from 'react'
import { Component,Image, View,StyleSheet,ScrollView, Text ,TouchableOpacity, Picker} from 'react-native'
import {Card, Button,Title, Avatar, DataTable, TextInput, RadioButton } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import CustomHeader from '../../../../components/CustomHeader'
import KeyboardShift from '../../../../components/KeyboardShift'

export default class z2bScreen extends React.Component{
    state = {
        //ganti kata2 yang ada disini
        inputItems : [
            {name:"Flexible Coupling(Loose,Crack)",condition:'Good',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"PTO(Oil level, Oil Leak)",condition:'Bad',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"PTO Relief Valve(Oil Leak)",condition:'Good',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"Accumulator Pilot Pressure(Oil Leak)",condition:'Good',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"All Hoe Related(Crack,Loose,Leak)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"Electric Equipment(Connection)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"Pilot Control Pump(Oil Leak,Bolt Loose etc)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"PTO Lubrication Pump(Oil Leak,Bolt Loose etc)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"Pump Fan Oil Cooler(Oil Leak,Bolt Loose etc)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"High Pressure Filter(Oil Leak,Crack,Bolt Loose etc)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"Pump No.1(Oil Leak,Bolt Loose etc)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"Pump No.2(Oil Leak,Bolt Loose etc)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"Pump No.3(Oil Leak,Bolt Loose etc)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
            {name:"Shut Off Valve Hydraulic Tank(Leak)",condition:'',note:'None',priority:'None',foto:{name:'',catatan:''},remark:''},
           
        ] 
    }
    static navigationOptions = {
        headerTitle:<CustomHeader headerName="zone"/>,
        headerStyle:{backgroundColor:"#FEDA01"},
        headerIcon:null,
    }
    constructor(props){
        super(props);
        
        this.groupProps={
            condition:'',
            note:["None","Leak","Broken","Missing","Loosen ","Worn","Crack","Other"],
            priority:["None","Now","Chng. Shift","Next PS","Backlog"],
            foto:{name:'',catatan:''},
            remark:''
        }
    }
    setCondition(value){

    }
    render(){
        const checked = 'first'
        return (
            <KeyboardShift>
                { ()=>( 
                <View style={styles.container}>
                    <ScrollView style={styles.inputField}>
                    {
                        this.state.inputItems.map(({name,condition,note,priority,remark},key,)=>( 
                            <View key={key} style={{padding:10}}>
                                <Card>
                                    <Card.Content > 
                                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                        <View>
                                            <Title>{name}</Title>
                                        </View>
                                        <View>
                                            <RadioButton.Group
                                            onValueChange={condition => {
                                                const inputItems =[...this.state.inputItems]
                                                inputItems[key] = {...inputItems[key],condition:condition}
                                                this.setState({inputItems})
                                            }} value={condition}
                                            >
                                                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                                <Text>Good  </Text>
                                                <Text> Bad </Text>
                                                <Text> Uncheck</Text>
                                                </View>
                                                <View style={{flexDirection:"row"}}>
                                                <RadioButton value="Good"/>
                                                <RadioButton value="Bad" />
                                                <RadioButton value="Uncheck" />
                                                </View>
                                            </RadioButton.Group>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                        <View>
                                            <Text>Note</Text>
                                            <Picker
                                                style={{width: 115}}
                                                selectedValue={note}
                                                onValueChange={note => {
                                                    const inputItems =[...this.state.inputItems]
                                                    inputItems[key] = {...inputItems[key],note:note}
                                                    this.setState({inputItems})
                                                }
                                                }>
                                                {
                                                    this.groupProps.note.map((note,key) => (
                                                        <Picker.Item key={key} label={note} value={note} />
                                                    ))
                                                }
                                            </Picker>
                                        </View>
                                        <View>
                                            <Text>Priority</Text>
                                            <Picker
                                                style={{width: 115}}
                                                selectedValue={priority}
                                                onValueChange={priority => {
                                                    const inputItems =[...this.state.inputItems]
                                                    inputItems[key] = {...inputItems[key],priority:priority}
                                                    this.setState({inputItems})
                                                }
                                                }>
                                                {
                                                    this.groupProps.priority.map((priority,key) => (
                                                        <Picker.Item key={key} label={priority} value={priority} />
                                                    ))
                                                }
                                            </Picker>
                                        </View>
                                        <View>
                                            <Button icon="add-a-photo" dark={true} mode="text">foto</Button>
                                        </View>
                                    </View> 

                                    <View style={{flexDirection:"column"}}>
                                            <TextInput mode="flat" label="Remark" 
                                            value={remark} onChangeText={(remark)=>{
                                                const inputItems =[...this.state.inputItems]
                                                inputItems[key] = {...inputItems[key],remark:remark}
                                                this.setState({inputItems})
                                            }} 
                                            ></TextInput>
                                    </View>

                                    </Card.Content>
                                </Card>
                                    
                            </View>
                        ))
                    }
                    <View style={{flexDirection:'row',justifyContent:'flex-end',marginVertical:10,padding:10}}>
                        <Button icon="keyboard-arrow-left" mode="contained" style={{marginHorizontal:10}}>Kembali</Button>
                        <Button icon="save" mode="contained" mode="contained">Simpan</Button>
                    </View>

                    
                    </ScrollView>
                </View>
                )}
            </KeyboardShift>
        )
    }    
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    inputField:{
        flexDirection:'column',
        padding:10,
        paddingBottom:20
    },
    subContainer:{
        flexDirection:'row'
    }
})