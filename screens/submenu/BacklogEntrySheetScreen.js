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
export default class BacklogEntrySheetScreen extends React.Component{
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
            site:'',
            tipe:'',
            sumber:'',
            problem:'',
            hm:'',
            estimasi:'',
            resp:'',
            work:'',
            suggested:'',
            priority:'',
            number:'',
            desc:'',
            figure:'',
            index:'',
            qty:'',
            mark:'',
            date1:"20-12-2019"
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
            <TextInput value={this.state.site} onChangeText={(site)=>this.setState({site})} label="Bracnch/Site" mode="outlined"></TextInput>
            <TextInput value={this.state.tipe} onChangeText={(tipe)=>this.setState({tipe})} label="Tipe Unit" mode="outlined"></TextInput>
            <TextInput value={this.state.sumber} onChangeText={(sumber)=>this.setState({sumber})} label="Sumber Temuan" mode="outlined"></TextInput>
            <TextInput value={this.state.problem} onChangeText={(problem)=>this.setState({problem})} label="Problem(Component Code)" mode="outlined"></TextInput>
            <TextInput value={this.state.hm} onChangeText={(hm)=>this.setState({hm})} label="HM Unit" mode="outlined"></TextInput>
            <TextInput value={this.state.estimasi} onChangeText={(estimasi)=>this.setState({estimasi})} label="Estimasi Job(Hours)" mode="outlined"></TextInput>
            <TextInput value={this.state.resp} onChangeText={(resp)=>this.setState({resp})} label="Resp" mode="outlined"></TextInput>
            <TextInput value={this.state.work} onChangeText={(work)=>this.setState({work})} label="Work Zone" mode="outlined"></TextInput>
            <TextInput value={this.state.suggested} onChangeText={(suggested)=>this.setState({suggested})} label="Suggested Action" mode="outlined"></TextInput>
            <TextInput value={this.state.priority} onChangeText={(priority)=>this.setState({priority})} label="Priority" mode="outlined"></TextInput>
            <TextInput value={this.state.number} onChangeText={(number)=>this.setState({number})} label="Part Number" mode="outlined"></TextInput>
            <TextInput value={this.state.desc} onChangeText={(desc)=>this.setState({desc})} label="Part Description" mode="outlined"></TextInput>
            <TextInput value={this.state.figure} onChangeText={(figure)=>this.setState({figure})} label="Figure" mode="outlined"></TextInput>
            <TextInput value={this.state.index} onChangeText={(index)=>this.setState({index})} label="Index" mode="outlined"></TextInput>
            <TextInput value={this.state.qty} onChangeText={(qty)=>this.setState({qty})} label="Quantity" mode="outlined"></TextInput>
            <TextInput value={this.state.mark} onChangeText={(mark)=>this.setState({mark})} label="Mark" mode="outlined"></TextInput>
            <DatePicker
            date={this.state.date1}
            format="DD-MM-YYYY"
            placeholder="Backlog Date(Tanggal Saat Backlog Dilakukan)"
            showIcon={false}
            onDateChange={(date)=> {this.setState({date:date})}}/>
            {
           
                <View style={styles.submenu}>
                    <Button icon="keyboard-arrow-left" mode="contained" style={{marginHorizontal:10}}>Create New</Button>
                </View>

            
            }
            <View style={{flexDirection:'row',justifyContent:'flex-end',marginVertical:10,padding:10}}>
               
               <Button  mode="contained" style={{marginHorizontal:10}}>Save</Button>
               <Button  mode="contained" mode="contained">Upload</Button>
               <Button  mode="contained" style={{marginHorizontal:10}}>Back</Button>
               <Button  mode="contained" mode="contained">Finish</Button>
          
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