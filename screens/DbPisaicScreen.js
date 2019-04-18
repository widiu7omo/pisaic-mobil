import React from 'react'
import {Text,TouchableOpacity,Image, View, StyleSheet} from 'react-native'
import {Button } from 'react-native-paper'
class LogoTitle extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
          <Image 
          source={require('../assets/images/iconut.png')}
          style={{marginHorizontal:5,width:40,height:40}}/>
          </TouchableOpacity> 
          <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>Database Pisaic</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:10,fontWeight:'100',}}>member of </Text>
              <Text style={{fontSize:10,fontWeight:'bold'}}>ASTRA</Text>
            </View>
            
          </View>
        </View>
      )
    }
  }
export default class DbPisaicScreen extends React.Component{
    constructor(){
        super()
        this.dataButtons = [{name:'Periodict Inspection Sheet',action:''},
                            {name:'Inspection Camera',action:''},
                            {name:'Problem Log',action:''},
                            {name:'Backlog Entry Sheet',action:''},
                            {name:'Backlog Monitoring Sheet',action:''},
                            {name:'Cylinder Daily Check Sheet',action:''}]
    }
    static navigationOptions = ({navigation}) => {
        // title: "United Tractor",
        return {
          headerTitle:<LogoTitle navigation={navigation}/>,
          headerStyle:{backgroundColor:"#FEDA01"}
        }
      }
    render(){
        return (
            <View style={styles.container}>
                {
                    this.dataButtons.map((button,key)=>{
                        return (<Button mode="contained" key={key} style={styles.subContainer} onPress={()=>this.props.navigation.navigate(button.action)}>{button.name}</Button>)
                    })
                    
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    subContainer:{
        margin:10,
        flexDirection:"column"
    }
})