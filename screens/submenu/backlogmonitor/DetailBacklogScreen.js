import React from 'react'
import { Component,Image, View,StyleSheet,ScrollView, Text ,TouchableOpacity} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'

class LogoTitle extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
          {/* <Image 
          source={require('../../assets/images/iconut.png')}
          style={{marginHorizontal:5,width:40,height:40}}/> */}
          </TouchableOpacity> 
          <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>{this.props.navigation.getParam('headerTitle','Nama Menu...')}</Text>
          </View>
        </View>
      )
    }
  }
export default class DetailBacklogScreen extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle:<LogoTitle navigation={navigation}/>,
            headerStyle:{backgroundColor:"#FEDA01"},
            headerIcon:null,
        }
    }
    constructor(props){
        super(props);
        this.state = {
            date:"20-12-2019",
            wono:'',
            refisisr:'',
            pocust:'',
            prodname:'',
            modelunit:'',
            modelengine:'',
            estjob:'',
            note:'',
            note2:'',
            ttdsdh:'',
            sdhname:''
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
                    <TextInput value={this.state.wono} onChangeText={(wono)=>this.setState({wono})} label="WO No." mode="outlined"></TextInput>
                    <TextInput value={this.state.refisisr} onChangeText={(refisisr)=>this.setState({refisisr})} label="Refisi SR" mode="outlined"></TextInput>
                    <TextInput value={this.state.pocust} onChangeText={(pocust)=>this.setState({pocust})} label="PO Cust." mode="outlined"></TextInput>
                    <TextInput value={this.state.prodname} onChangeText={(prodname)=>this.setState({prodname})} label="Product Name" mode="outlined"></TextInput>
                    <TextInput value={this.state.modelunit} onChangeText={(modelunit)=>this.setState({modelunit})} label="Model Unit/ Equipment No." mode="outlined"></TextInput>
                    <TextInput value={this.state.modelengine} onChangeText={(modelengine)=>this.setState({modelengine})} label="Model Engine/ Equipment No." mode="outlined"></TextInput>
                    <TextInput value={this.state.estjob} onChangeText={(estjob)=>this.setState({estjob})} label="Estimasi Pekerjaan" mode="outlined"></TextInput>
                    <TextInput multiline={true} value={this.state.note} onChangeText={(note)=>this.setState({note})} label="Catatan" mode="outlined" style={{height:200}}></TextInput>
                    <TextInput multiline={true} value={this.state.note2} onChangeText={(note2)=>this.setState({note2})} label="Tanda tangan SDH" mode="outlined" style={{height:200}}></TextInput>
                    <TextInput multiline={true} value={this.state.ttdsdh} onChangeText={(ttdsdh)=>this.setState({ttdsdh})} label="SDH Name" mode="outlined" style={{height:200}}></TextInput>
                    <TextInput multiline={true} value={this.state.sdhname} onChangeText={(sdhname)=>this.setState({sdhname})} label="Catatan" mode="outlined" style={{height:200}}></TextInput>

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