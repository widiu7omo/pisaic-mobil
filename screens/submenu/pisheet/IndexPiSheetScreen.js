import React from 'react'
import { View,Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import { ViewPagerAndroid } from 'react-native-gesture-handler';
import CustomHeader from "../../../components/CustomHeader";

//if you want to get unit name on subheader, then send param from navigate function with "unit" param

export default class IndexPiSheetScreen extends React.Component{
    static navigationOptions = {
            headerTitle:<CustomHeader headerName="subMenuTitle" />,
            headerStyle:{backgroundColor:"#FEDA01"},
            headerIcon:null
    } 
    constructor(){
        super(); 
        this.submenus = [
                {name:'Workorder & Others',screen:'Workorder'},
                {name: 'Dataunit',screen:'Dataunit'},
                {name: 'Zone 1: Front Attachment & Track Group', screen: 'Zone1'},
                {name: 'Zone 2: Upper Front, Central Frame & Motor Area',screen:'Zone2'},
                {name: 'Zone 3: Upper Rear Area - Cabin & Motor Container',screen: 'Zone3'}
            ]
    }
    render(){
        return(
            <View style={styles.container}>
            
                
                <ScrollView style={styles.inputField}>
                {
                    this.submenus.map((submenu,key) =>( 
                        <View key={key} style={styles.submenu}>
                            <Button style={styles.menuButton} mode="contained" onPress={() =>this.props.navigation.navigate(submenu.screen,{zoneTitle:submenu.screen,unit:this.props.navigation.getParam('unit','Unit Name')})}>{submenu.name}</Button>
                           
                        </View>
     
                    ))
                }
                     <View style={{flexDirection:'row',justifyContent:'flex-end',marginVertical:10,padding:10}}>
                       
                           <Button  mode="contained" style={{marginHorizontal:10}}>Save</Button>
                           <Button  mode="contained" mode="contained">Upload</Button>
                           <Button mode="contained" style={{marginHorizontal:10}}>Back</Button>
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
    submenu:{
        flexDirection:'column',
        padding:10
    },
    inputField:{
        flexDirection:'column',
        padding:10,
        paddingBottom:20
    },
    subContainer:{
        flexDirection:'row'
    }
})
