import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { Button, Card, Title, Paragraph, Headline } from 'react-native-paper';

class LogoTitle extends React.Component{
  render(){
    return (
      <View style={{flexDirection:'row'}}>
        <Image
        source={require('../assets/images/iconut.png')}
        style={{marginHorizontal:5,width:40,height:40}}/>
        <Text style={{fontSize:30,fontWeight:'bold'}}>United Tracktors</Text>
      </View>
    )
  }
}
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    // title: "United Tractor",
    headerTitle:<LogoTitle/>
  };
  constructor(){
    super();
    this.units = [
      'SE001',
      'SE002',
      'SE003',
      'SE004',
      'SE005',
      'SE006',
      'SE007',
      'SE008',
      'SE009',
      'SE0010',
      'SE0011',
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
            <Text border={{}}>PISAIC</Text>
          </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            {
              this.units.map((unit,key) => (
                  <Card style={styles.cardContent} key={key}>
                    <Card.Content>
                      <Title>{unit}</Title>
                      <Paragraph></Paragraph>
                    </Card.Content>
                    <Card.Actions>
                      <Button mode="outlined" onPress={()=>this.props.navigation.navigate('Unitmenu',{unitName:unit})}>Buka</Button>
                    </Card.Actions>
                  </Card>
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
    // flexDirection:'column'
  },
  helpContainer: {
    // marginTop: 10,
    // marginBottom:20,
    // alignItems: 'center',
    justifyContent:'center'
  },
  cardContent:{
    marginHorizontal:10,
    marginTop:15
  }
});
