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
export default class InspectCameraScreen extends React.Component{
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
            iden:'',
            nama:'',
            foto:'',
            ttd:''
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
                    placeholder="Tanggal Pemeriksaan"
                    showIcon={false}
                    onDateChange={(date)=> {this.setState({date:date})}}/>
                    <TextInput value={this.state.iden} onChangeText={(iden)=>this.setState({iden})} label="Identitas Pemeriksa" mode="outlined"></TextInput>
                    <TextInput value={this.state.nama} onChangeText={(nama)=>this.setState({nama})} label="Nama Komponen" mode="outlined"></TextInput>
                    <TextInput value={this.state.foto} onChangeText={(foto)=>this.setState({foto})} label="Foto" mode="outlined"></TextInput>
                    <TextInput value={this.state.ttd} onChangeText={(ttd)=>this.setState({ttd})} label="Tanda Tangan Pemeriksa" mode="outlined"></TextInput>
                    {
                     
                        <View style={styles.submenu}>
                            <Button icon="keyboard-arrow-left" mode="contained" style={{marginHorizontal:10}}>Create New</Button>
                        </View>
     
                    
                    }
                    <View style={{flexDirection:'row',justifyContent:'flex-end',marginVertical:10,padding:10}}>
                       
                       <Button mode="contained" style={{marginHorizontal:10}}>Save</Button>
                       <Button mode="contained" mode="contained">Upload</Button>
                       <Button mode="contained" style={{marginHorizontal:10}}>Back</Button>
                       <Button mode="contained" mode="contained">Finish</Button>
                  
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