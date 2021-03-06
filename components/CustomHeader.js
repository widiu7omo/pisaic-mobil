import React from 'react'
import { View,TouchableOpacity, Text, Image } from 'react-native'
import { withNavigation } from 'react-navigation';
import {normalize} from '../constants/FontSize'
//custom header accept param headerName and object of navigation
class CustomHeader extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return (
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
          <Image
          source={require('../assets/images/iconut.png')}
          style={{marginHorizontal:5,width:40,height:40}}/>
          </TouchableOpacity>
          <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:normalize(20),fontWeight:'bold'}}>{this.props.navigation.getParam(this.props.headerName,'Headertitle...')}</Text>
              <View  style={{flexDirection:'row'}}>
                  <Text style={{fontSize:normalize(10),fontWeight:'100',}}>{`Unit ${this.props.navigation.getParam('unit','Name')}`}</Text>
              </View>
          </View>
        </View>
      )
    }
  }
  export default withNavigation(CustomHeader) 
