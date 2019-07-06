import React from 'react'
import {View, StyleSheet, Image, Text, ScrollView, FlatList, ActivityIndicator} from 'react-native'
import {Button} from 'react-native-paper'
import CustomHeader from '../../components/CustomHeader'
import query from '../../database/query'
import {checkDataTable} from '../../constants/Data_to_update'
import Colors from "../../constants/Colors";
import {ID} from "../../constants/Unique";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

export default class IndexSubmenuScreen extends React.Component {
    constructor(props) {
        super(props);
        //props
        this.state = {
            menus: [],
            loading: false
        }

    }

    getTable = async () => {
        await query(`select *
                     from kinds`, [])
            .then(result => {
                // console.log(result);
                this.setState({menus: result});
                this.setState({loading: false});
            })
    };

    componentDidMount() {
        this.setState({loading: true});
        this.getTable()

    }

    static navigationOptions = {
        //sub menu, the header name param is unitName
        headerTitle: <CustomHeader headerName="unitName"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };

    goTo = async menu => {
        //sampai sini
        let kind_id = menu.id;
        let unit_id = this.props.navigation.getParam('idUnit');
        //retrieve existing id from local
        await query(`SELECT id
                     FROM kind_units
                     WHERE kind_id = ?
                       AND unit_user_id = ?`, [kind_id, unit_id])
            .then(async res => {
                //generate new id
                let kind_unit_id = ID();
                //if found
                if (res.length > 0) {
                    //replace generated id with existing id
                    kind_unit_id = res[0].id;
                }
                //insert or replace with kind_unit_id
                await query(`INSERT OR
                             REPLACE
                             INTO kind_units (id, kind_id, unit_user_id)
                             VALUES (?, ?, ?);`, [kind_unit_id, kind_id, unit_id]);
                if (this.props.screenProps.isConnected) {
                    await checkDataTable('kind_units').then(console.log('synced kind_units'));
                }
                await this.props.navigation.navigate(menu.screen, {
                    subMenuTitle: menu.name,
                    idKind: kind_id,
                    idUnit: unit_id,
                    kind_unit_id: kind_unit_id,
                    unit: this.props.navigation.getParam('unitName')
                });

            });

    };

    render() {
        const {menus, loading} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Image style={{width:wp('100%'),height:200, padding: 0}}
                           source={require('../../assets/images/banner1.jpg')}>
                    </Image>
                    <View style={styles.bordered}>
                        <View style={{backgroundColor:'#FEDA01',padding:5}}>
                            <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>PISAIC</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#FEDA01'}}><Text style={{textAlign: 'center',fontWeight:'bold'}}>Periodic Inspection and Camera Inspection</Text></View>
                </View>
                <ScrollView>
                    <View style={{justifyContent: "center", flex: 1}}>
                        {loading ?
                            <ActivityIndicator size={"large"} color={Colors.darkColor} style={{marginTop: 20}}/> :
                            <FlatList data={menus}
                                      renderItem={({item}) => {
                                          return (<Button style={styles.menusContent} mode="contained"
                                                          onPress={() => this.goTo(item)}>{item.name}</Button>)
                                      }}
                                      extraData={this.state}
                                      keyExtractor={(item) => item.name}>
                            </FlatList>
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop:20,
    },
    contentContainer: {
        flexDirection: 'column'
    },
    menusContent: {
        margin: 10
    },
    bordered: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        fontSize: 25,
        top: 0,
        bottom: 10,
        left: 0,
        right: 10,
    },
});