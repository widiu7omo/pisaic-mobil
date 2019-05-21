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
export default class IndexZone2Screen extends React.Component{
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
        };
        this.z2Menus = [
            {name:"A. Main Drive Motor",screen:'z2a'},
            {name:"B. PDG And Pump",screen:'z2b'},
            {name:"C. Swing",screen:'z2c'},
            {name:"D. Oil Center",screen:'z2d'},
            {name:"E. Central Lubrication System (CLS)",screen:'z2e'},
            {name:"F. Swing Lubrication System (SLS)",screen:'z2f'},
            {name:"G. Hydraulic",screen:'z2g'},
            {name:"H. Electric",screen:'z2h'},
            {name:"Additional Of Fluid (Oil, Coolant, Grease)",screen:'z2i'},
        ]
    }
    render(){
        return (
            <View style={styles.container}>
            {/* bring your input here */}
                {/* <Text>This is from workorder</Text> */}
                <ScrollView style={styles.inputField}>
                   {
                       this.z2Menus.map((menu,key)=>
                       (
                           <Button style={styles.button} key={key} onPress={()=>this.props.navigation.navigate(menu.screen,{zone:menu.name,unit:this.props.navigation.getParam('unit')})} mode="contained">{menu.name}</Button>
                       ))
                   }
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
    button:{
        margin:10
    }
});