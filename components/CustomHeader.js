import React from 'react'
import { View,TouchableOpacity, Text, Image } from 'react-native'
//custom header accept param headerName and object of navigation
export default class CustomHeader extends React.Component{
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
            <Text style={{fontSize:25,fontWeight:'bold'}}>{this.props.navigation.getParam(this.props.headerName,'Headertitle...')}</Text>
              <View  style={{flexDirection:'row'}}>
                  <Text style={{fontSize:10,fontWeight:'100',}}>{`Unit ${this.props.navigation.getParam('unit','Name')}`}</Text>
              </View>
          </View>
        </View>
      )
    }
  }
