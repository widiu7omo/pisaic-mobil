import React from 'react'
import { View,Image,Text, StyleSheet, ScrollView,TouchableOpacity, } from 'react-native'
import Markdown from 'react-native-easy-markdown'

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
            <Text style={{fontSize:25,fontWeight:'bold'}}>About Pisaic</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:10,fontWeight:'100',}}>member of </Text>
              <Text style={{fontSize:10,fontWeight:'bold'}}>ASTRA</Text>
            </View>
            
          </View>
        </View>
      )
    }
  }
export default class AboutScreen extends React.Component{
    static navigationOptions = ({navigation}) => {
        // title: "United Tractor",
        return {
          headerTitle:<LogoTitle navigation={navigation}/>,
          headerStyle:{backgroundColor:"#FEDA01"}
        }
      }
    constructor(){
        super()
    }
    render(){
        return(
            <ScrollView style = {styles.container}>
                <Image style={styles.img}
                source={{uri:'https://facebook.github.io/react/logo-og.png', method:'POST'}}>
                </Image>
                <View style = {styles.subContainer}>
                    <Markdown style={styles.textAlign}>
                        {
                        '#Aplikasi PISAIC \n\n'+
                        ' Aplikasi ini dibuat untuk memenuhi perkembangan industri yang berada di revolusi industri 4.0 dan bergantung kepada digitalisasi. '+
                        'Revolusi industri 4.0 dapat : \n\n'+
                        '1. Bermanfaat bagi manusia, dan lingkungan.\n\n'+
                        '2. Mendorong pengembangan kapasitas manusia.\n\n' + 
                        '3. Mengakses teknologi agar dapat terjangkau dengan mudah.\n\n'+
                        '4. Memajuan teknologi agar dapat menghasilkan keterbukaan informasi.\n\n'+
                        '5. Menggeser paradigma lama, dari persaingan menjadi koneksi dan kerjasama.\n\n'+
                        '6. Menjawab tantangan perubahan iklim dan upaya pelestarian lingkugan.\n\n'+
                        'PISAIC di gunakan untuk mempercepat proses periodic inspection agar nantinya aplikasi ini dapat membantu perusahaan dalam mencapai target pemasaran dan untuk mencegah unscheduled breakdown.\n\n'+
                        'PISAIC di buat oleh mahasiswa magang dari Polman Astra, untuk penyelesaian program Diploma 3. Aplikasi ini masih dalam penyempurnaan selama pemakaian.'
                    }
                    </Markdown>
                </View>
            </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    subContainer:{
        flexDirection:'column',
        margin:10
    },
    img:{
        flexDirection:'column',
        height:200,
        padding:0
    },
    bold:{
        fontWeight:'bold'
    },
    justify:{
        textAlign:'justify'
    },
    inputField:{
        flexDirection:'column',
        padding:10,
    }
})