import React from 'react';
import {Text,StyleSheet} from 'react-native'
import Colors from '../constants/Colors';

export default class DrawerLabel extends React.Component {
  render() {
    return (
      <Text style={styles.textLabel}>{this.props.label}</Text>
    );
  }
}
const styles = StyleSheet.create({
    textLabel:{
        fontSize:12,
        fontFamily:'Roboto',
        fontWeight:'bold'
    }
    
})