import React from 'react'
import {Image, View,StyleSheet,ScrollView, Text ,TouchableOpacity} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import CustomHeader from '../../../../components/CustomHeader'

export default class IndexZone1Screen extends React.Component{
    static navigationOptions = {
            headerTitle:<CustomHeader headerName="zoneTitle"></CustomHeader>,
            headerStyle:{backgroundColor:"#FEDA01"},
            headerIcon:null,
    }
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
        }
        this.z1Menus = [
            {name:"A. Bucket Group",screen:'BucketGroup'},
            {name:"B. Stick Group",screen:'z1b'},
            {name:"C. Boom Group",screen:'z1c'},
            {name:"D. Track Group LH",screen:'z1d'},
            {name:"E. Track Group RH",screen:'z1e'},
            {name:"F. Center Frame",screen:'z1f'},
            {name:"G. Ladder",screen:'z1g'},
        ]
    }
    render(){
        return (
            <View style={styles.container}>
            {/* bring your input here */}
                {/* <Text>This is from workorder</Text> */}
                <ScrollView style={styles.inputField}>
                   {
                       this.z1Menus.map((menu,key)=>
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
})