import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors'
import { Button, Card, Title, Paragraph, Headline } from 'react-native-paper';

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
          <Text style={{fontSize:25,fontWeight:'bold'}}>United Tracktors</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:10,fontWeight:'100',color:"#1475B2"}}>member of </Text>
            <Text style={{fontSize:10,fontWeight:'bold',color:"#1475B2"}}>ASTRA</Text>
          </View>
          
        </View>
      </View>
    )
  }
}
export default class ListUnitScreen extends React.Component {
  static navigationOptions = ({navigation,navigationOptions}) => {
    // title: "United Tractor",
    return {
      headerTitle:<LogoTitle navigation={navigation}/>,
      headerStyle:{backgroundColor:"#FEDA01"}
    }
  }
  constructor(){
    super();
    this.units = [
      'SE 3001',
      'SE 3002',
      'SE 3003',
      'SE 3004',
      'SE 3005',
      'SE 3006',
      'SE 3007',
    ]
  }
  render() {
    return (
      <View style={styles.container}>
       <View style={styles.contentContainer}>
            <Image style={{height:200,padding:0}}
              source={{uri:'https://facebook.github.io/react/logo-og.png',
              method:'POST'}}>
            </Image>
            <View style={styles.bordered}>
              <Text style={{color:`${Colors.primaryColor}`,fontSize:25,fontWeight:'bold'}}>PISAIC</Text>
            </View>
          </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            {
              this.units.map((unit,key) => (
                <Button style={styles.cardContent} key={key} mode="contained" onPress={()=>this.props.navigation.navigate('UnitMenu',{unitName:unit})}>{unit}</Button>
                  // <Card style={styles.cardContent} key={key}>
                  //   <Card.Content>
                  //     <Title>{unit}</Title>
                  //     <Paragraph></Paragraph>
                  //   </Card.Content>
                  //   <Card.Actions>

                  //   </Card.Actions>
                  // </Card>
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }

  // _gotoMenu = () =>{
  //   this.props.navigation.navigate('Unitmenu')
  // }

  // _handleHelpPress = () => {
  //   WebBrowser.openBrowserAsync(
  //     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
  //   );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal:10,
    // backgroundColor: '#fff',
  },
  contentContainer: {
    // paddingTop: 30,
    flexDirection:'column'
  },
  helpContainer: {
    // marginTop: 10,
    // marginBottom:20,
    // alignItems: 'center',
    justifyContent:'center'
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
  cardContent:{
    marginHorizontal:10,
    marginTop:15,
    // maxWidth:80
  }
});
