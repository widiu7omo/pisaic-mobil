import React from 'react'
import { View, Text,Image, TouchableOpacity,StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import Colors from '../../../constants/Colors'

class LogoTitle extends React.Component{
    constructor(props){
      super(props);
    }
    //buat header atas
    render(){
      return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
          <Image 
          source={require('../../../assets/images/iconut.png')}
          style={{marginHorizontal:5,width:40,height:40}}/>
          </TouchableOpacity> 
          <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>United Tractors</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:10,fontWeight:'100',}}>member of </Text>
              <Text style={{fontSize:10,fontWeight:'bold'}}>ASTRA</Text>
            </View>
            
          </View>
        </View>
      )
    }
  }
export default class IndexCylinderScreen extends React.Component{
    static navigationOptions = ({navigation,navigationOptions}) => {
        // title: "United Tractor",
        return {
          headerTitle:<LogoTitle navigation={navigation}/>,
          headerStyle:{backgroundColor:"#FEDA01"}
        }
      }
    constructor(){
        super();

        //admin menu, workorder,cek status,goto pi, create pi
        //spv menu, give order,cek status,goto pi
        this.menus = [
            {name:'Data Unit',screen:'DataUnitDaily'},
            {name:'Sheet',screen:'SheetDaily'},
           
        ]
    }
    
    render(){
        const textColor = Colors.primaryColor
      
        return(
            <View style={styles.container}>
            <View style={styles.subContainer}>
                <Image style={{height:200,padding:0}}
                  source={{uri:'https://facebook.github.io/react/logo-og.png',
                  method:'POST'}}>
                </Image>
                <View style={styles.bordered}>
                  <Text style={{color:`${textColor}`,fontSize:25,fontWeight:'bold'}}>PISAIC</Text>
                </View>
            </View>
            <View style={styles.subContainer}>
                {
                    this.menus.map((menu,key)=>( 
                        <Button style={styles.button} key={key} mode="contained" onPress={()=>this.props.navigation.navigate(menu.screen,{headerTitle:menu.name})}>{menu.name}</Button>
                    ))
                }
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    bordered:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        position:'absolute',
        fontSize:25,
        top:0,
        bottom:10,
        left:0,
        right:10,
    },
    subContainer:{
        
        flexDirection:'column'
    },
    button:{
        margin:10
    }
})