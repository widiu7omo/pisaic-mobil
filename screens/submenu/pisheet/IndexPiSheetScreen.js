import React from 'react'
import {View, Alert, AsyncStorage, StyleSheet, ScrollView, FlatList, ActivityIndicator, Image, Text} from 'react-native'
import {Button} from 'react-native-paper'
import CustomHeader from "../../../components/CustomHeader";
import query from "../../../database/query";
import Colors from "../../../constants/Colors";
import {checkDataTable} from "../../../constants/Data_to_update";
import {ID} from "../../../constants/Unique";
import LoadingDialog from "../../../components/LoadingDialog";
import {Uploader} from "../../../constants/Uploader";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

//if you want to get unit name on subheader, then send param from navigate function with "unit" param

export default class IndexPiSheetScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <CustomHeader headerName="subMenuTitle"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            submenus: [],
            progress: false,
            progressMessage: '',
            imageQueue:0,
        }
    }

    getTable = async () => {
        await query(`select *
                     from zones`, [])
            .then(result => {
                // console.log(result);
                this.setState({submenus: result});
                this.setState({loading: false});
            })
    };

    async componentDidMount() {
        let lengthQueue = 0;
        this.setState({loading: true});
        let imageQueue = await AsyncStorage.getItem('fotoQueue');
        if(imageQueue){
            lengthQueue = JSON.parse(imageQueue).length;
        }
        console.log(lengthQueue);
        this.setState({imageQueue: lengthQueue});
        await query(`select *
               from kind_units`).then(res => console.log(res));
        this.setState({loading: true});
        this.getTable()
    }

    _uploadImage = async () => {
        const {isConnected} = this.props.navigation.getScreenProps();
        if (isConnected) {

            const fotoQueue = await AsyncStorage.getItem('fotoQueue');

            const parsedFotoQueue = JSON.parse(fotoQueue);
            console.log('connect with internet and retrive data from fotoQueue');
            console.log(parsedFotoQueue);
            //filtering if any undefined value
            if (Array.isArray(parsedFotoQueue) && parsedFotoQueue.length > 0) {
                this.setState({progress: true});
                // console.log(parsedFotoQueue);
                let dataFotoQueue = [];

                parsedFotoQueue.forEach((foto,index) => {
                    if(typeof foto.uri !== "undefined"){
                        dataFotoQueue.push(foto)
                    }
                });
                console.log('filtering parsed Foto Queue')
                console.log(dataFotoQueue)
                Uploader(dataFotoQueue).then(() => {
                    this.setState({progress: false});
                    AsyncStorage.setItem('fotoQueue', JSON.stringify([]));
                    this.setState({imageQueue:0});
                })
            } else {
                Alert.alert('No Need Action', 'Data already uploaded. No need Action')
            }
        } else {
            Alert.alert('Fail', 'You\'re not connect to the internet');
        }

    };

    goTo = async submenu => {
        let kind_unit_id = this.props.navigation.getParam('kind_unit_id');
        let zone_id = submenu.id;
        await query(`SELECT id
                     FROM kind_unit_zones
                     WHERE kind_unit_id = ?
                       AND zone_id = ?`, [kind_unit_id, zone_id])
            .then(async res => {
                //generate new id
                let kind_unit_zone_id = ID();
                //if found
                if (res.length > 0) {
                    //replace generated id with existing id
                    kind_unit_zone_id = res[0].id;
                }
                //insert or replace with kind_unit_id
                await query(`INSERT OR
                             REPLACE
                             INTO kind_unit_zones (id, kind_unit_id, zone_id)
                             VALUES (?, ?, ?);`, [kind_unit_zone_id, kind_unit_id, zone_id]);

                if (this.props.screenProps.isConnected) {
                    await checkDataTable('kind_unit_zones').then(console.log('synced kind_unit_zones'));
                }
                await this.props.navigation.navigate(submenu.screen, {
                    zoneTitle: submenu.screen,
                    unit: this.props.navigation.getParam('unit', 'Unit Name'),
                    idUnit: this.props.navigation.getParam('idUnit'),
                    zone_id: zone_id,
                    kind_unit_zone_id: kind_unit_zone_id,
                    onGoBack: () => this.updateQueue()
                });
            });
    };
    async updateQueue(){
        let imageQueue = await AsyncStorage.getItem('fotoQueue');
        let lengthQueue = JSON.parse(imageQueue).length;
        console.log(lengthQueue);
        this.setState({imageQueue: lengthQueue});
    }
    render() {
        const {submenus, loading} = this.state;
        return (
            <View style={styles.container}>
                <LoadingDialog visible={this.state.progress} message={'Be patient. Uploading photos to server'}/>
                <View style={styles.contentContainer}>
                    <Image style={{width:wp('100%'),height:200, padding: 0}}
                           source={require('../../../assets/images/banner4.jpg')}>
                    </Image>
                    <View style={styles.bordered}>
                        <View style={{backgroundColor:'#FEDA01',padding:5}}>
                            <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>PISAIC</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.inputField}>
                    {
                        loading ? <ActivityIndicator size={"large"} color={Colors.darkColor} style={{marginTop: 20}}/> :
                            <FlatList data={submenus}
                                      renderItem={({item}) => {
                                          return (
                                              <View style={styles.submenu}>
                                                  <Button style={styles.menuButton} mode="contained"
                                                          onPress={() => this.goTo(item)}>{item.name}</Button>
                                              </View>)
                                      }}
                                      extraData={this.state}
                                      keyExtractor={(item) => item.name}>
                            </FlatList>
                    }
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10, padding: 10}}>
                        {/*<Button mode="contained" style={{marginHorizontal: 10}}>Save</Button>*/}
                        <Button mode="contained" style={{backgroundColor: this.state.imageQueue>0?Colors.danger:Colors.success}} onPress={() => this._uploadImage()}>Upload Data ({this.state.imageQueue})</Button>
                        <Button mode="contained" style={{marginHorizontal: 10}} onPress={() => this.props.navigation.goBack()}>Back</Button>
                        <Button mode="contained" onPress={()=>this.props.navigation.goBack()}>Finish</Button>

                    </View>

                </ScrollView>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    submenu: {
        flexDirection: 'column',
        padding: 10
    },
    inputField: {
        flexDirection: 'column',
        padding: 10,
        paddingBottom: 20
    },
    subContainer: {
        flexDirection: 'row'
    }
});
