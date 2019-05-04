import React from 'react'
import { TouchableOpacity, View, ScrollView,Image,Text } from 'react-native'
import {DataTable } from 'react-native-paper'
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
            <Text style={{fontSize:25,fontWeight:'bold'}}>Tambah User</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:10,fontWeight:'100',}}>member of </Text>
              <Text style={{fontSize:10,fontWeight:'bold'}}>ASTRA</Text>
            </View>
            
          </View>
        </View>
      )
    }
  }
export default class AddUserScreen extends React.Component{
static navigationOptions = ({navigation}) => {
    // title: "United Tractor",
    return {
        headerTitle:<LogoTitle navigation={navigation}/>,
        headerStyle:{backgroundColor:"#FEDA01"}
    }
    }
constructor(){
    super()
    this.Users = [{name:"AHMAD FIRLI",nrp:"80112116",lahir:"14031990"},
                  {name:"BAKHTIAR RIFAI" ,nrp:"82102014" ,lahir:"12061982"},
                  {name:"DWI HINDHARYA P" ,nrp:"82107126" ,lahir:"29091986"},
                  {name:"FERIANUS" ,nrp:"82107080" ,lahir:"15061985"},
                  {name:"GUNAIDY" ,nrp:"80112121" ,lahir:"15011991"},
                  {name:"MUH. AGUS ROMI" ,nrp:"80107179" ,lahir:"14061983"},
                  {name:"MUH. YASIN" ,nrp:"80107232" ,lahir:"07031987"},
                  {name:"RUSWANTO" ,nrp:"80107138" ,lahir:"17061984"},
                  {name:"WAHYUDI" ,nrp:"80110206" ,lahir:"16041988"},
                  {name:"YUDHA PRAWIRA " ,nrp:"80110207" ,lahir:"20111989"},
                  {name:"ZAINURI" ,nrp:"80110259" ,lahir:"08061990"}]
}
render(){
    return (
        <ScrollView>
            <DataTable style={{textAlign:'center'}}>
                <DataTable.Header>
                <DataTable.Title style={{maxWidth:25}}>No</DataTable.Title>
                <DataTable.Title>Nama</DataTable.Title>
                <DataTable.Title numeric>NRP</DataTable.Title>
                <DataTable.Title numeric>Tanggal lahir</DataTable.Title>
                </DataTable.Header>
                {
                    this.Users.map((user,key)=>{
                        return (
                            <DataTable.Row key={key}>
                                <DataTable.Cell style={{maxWidth:25}}>{key+1}</DataTable.Cell>
                                <DataTable.Cell style={{textAlign:'left'}}>{user.name}</DataTable.Cell>
                                <DataTable.Cell style={{textAlign:'left'}} numeric>{user.nrp}</DataTable.Cell>
                                <DataTable.Cell style={{textAlign:'left'}} numeric>{user.lahir}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }

                <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={(page) => { console.log(page); }}
                label="1-2 of 6"
                />
            </DataTable>
        </ScrollView>
    )
}
}