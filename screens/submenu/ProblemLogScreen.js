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
export default class ProblemLogScreen extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle:<LogoTitle navigation={navigation}/>,
            headerStyle:{backgroundColor:"#FEDA01"},
            headerIcon:null,
        }
    };
    constructor(props){
        super(props);
        this.state = {
            date:"20-12-2019",
            lokasi:'',
            job:'',
            wono:'',
            spv:'',
            problem:'',
            dampak:'',
            start:'',
            end:'',
            resp:'',
            lapor:'',
            pic:'',
            mencegah:'',
            mengatasi:''
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
                    placeholder="Hari dan Tanggal"
                    showIcon={false}
                    onDateChange={(date)=> {this.setState({date:date})}}/>
                    <TextInput value={this.state.lokasi} onChangeText={(lokasi)=>this.setState({lokasi})} label="Lokasi(Workshop,Bay,Rebuild, Nama Pit)" mode="outlined"></TextInput>
                    <TextInput value={this.state.job} onChangeText={(job)=>this.setState({job})} label="Job Type" mode="outlined"></TextInput>
                    <TextInput value={this.state.wono} onChangeText={(wono)=>this.setState({wono})} label="Wo No." mode="outlined"></TextInput>
                    <TextInput value={this.state.spv} onChangeText={(spv)=>this.setState({spv})} label="Supervisor/Mechanic Leader" mode="outlined"></TextInput>
                    <TextInput value={this.state.problem} onChangeText={(problem)=>this.setState({problem})} label="Problem" mode="outlined"></TextInput>
                    <TextInput value={this.state.dampak} onChangeText={(dampak)=>this.setState({dampak})} label="Dampak" mode="outlined"></TextInput>
                    <TextInput value={this.state.start} onChangeText={(start)=>this.setState({start})} label="Start Time" mode="outlined"></TextInput>
                    <TextInput value={this.state.end} onChangeText={(end)=>this.setState({end})} label="End Time" mode="outlined"></TextInput>
                    <TextInput value={this.state.resp} onChangeText={(resp)=>this.setState({resp})} label="Resp" mode="outlined"></TextInput>
                    <TextInput value={this.state.lapor} onChangeText={(lapor)=>this.setState({lapor})} label="Dilaporkan Oleh" mode="outlined"></TextInput>
                    <TextInput value={this.state.pic} onChangeText={(pic)=>this.setState({pic})} label="PIC Yang Follow Up" mode="outlined"></TextInput>
                    <TextInput value={this.state.mencegah} onChangeText={(mencegah)=>this.setState({mencegah})} label="Langkah Unrunk Mengatasi Problem Dengan Segera(Yang Dilakukan Saat Itu)" mode="outlined"></TextInput>
                    <TextInput value={this.state.mengatasi} onChangeText={(mengatasi)=>this.setState({mengatasi})} label="Langkah Untuk Mencegah Problem Terulang Kembali(Saran Perbaikan)" mode="outlined"></TextInput>
                    {
                    
                        <View style={styles.submenu}>
                            <Button icon="keyboard-arrow-left" mode="contained" style={{marginHorizontal:10}}>Create New</Button>
                        </View>
     
                    
                    }
                    <View style={{flexDirection:'row',justifyContent:'flex-end',marginVertical:10,padding:10}}>
                       
                       <Button  mode="contained" style={{marginHorizontal:10}}>Save</Button>
                       <Button  mode="contained">Upload</Button>
                       <Button  mode="contained" style={{marginHorizontal:10}}>Back</Button>
                       <Button  mode="contained">Finish</Button>
                  
                    </View>
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
});