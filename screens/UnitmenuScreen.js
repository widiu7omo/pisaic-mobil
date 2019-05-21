import React from 'react'
import { View, StyleSheet,Image,Text } from 'react-native'
import { Button } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';

//aren't use it
export default class UnitmenuScreen extends React.Component{
    
    constructor(){
        super();
        //props
        this.menus = [
            { name:'Periodic Inspection Sheet', screen:'Pisheetmenu'},
            { name: 'Inspection Camera', screen:'InspectCamScreen'},
            { name: 'Problem Log', screen: 'ProblemLogScreen'},
            { name: 'Backlog Entry Sheet', screen: 'BesScreen'},
            { name: 'Backlog Monitoring Sheet', screen: 'BmsScreen'},
            { name: 'Cylinder Daily Check Sheet', screen: 'CdcsScreen'}
        ]
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('unitName','Nama Unit...')
        }
    };
    render(){
        return(
           <View style={styles.container}>
           <View style={styles.contentContainer}>
            <Image style={{height:200,padding:0}}
              source={{uri:'https://facebook.github.io/react/logo-og.png',
              method:'POST'}}>
            </Image>
            <View style={styles.bordered}>
              <Text style={{color:'rgba(233,22,22,0.8)',fontSize:25,fontWeight:'bold'}}>PISAIC</Text>
            </View>
           </View>
            <ScrollView>
                {
                    this.menus.map((menu, key) => (
                        <View key={key} style={styles.menusContent}>
                            <Button mode="outlined" onPress = {() => this.props.navigation.navigate(menu.screen)}>{menu.name}</Button>
                        </View>
                    ))
                }
            </ScrollView>
           </View> 
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // marginTop:20,
    },
    contentContainer:{
        flexDirection:'column'
    },
    menusContent: {
        padding:10
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
});