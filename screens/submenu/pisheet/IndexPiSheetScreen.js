import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator} from 'react-native'
import {Button} from 'react-native-paper'
import {ViewPagerAndroid} from 'react-native-gesture-handler';
import CustomHeader from "../../../components/CustomHeader";
import {zones} from "../../../constants/Default_zones";
import query from "../../../database/query";
import Colors from "../../../constants/Colors";
import {checkDataTable} from "../../../constants/Data_to_update";

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
            submenus: []
        }
    }

    getTable = async () => {
        await query(`select *
                     from zones`, [])
            .then(result => {
                // console.log(result);
                this.setState({submenus: result})
                this.setState({loading: false});
            })
    };

    componentDidMount() {
        // console.log(this.props.navigation.getParam('kind_unit_id'));
        query(`select *
               from kind_units`).then(res => console.log(res));
        this.setState({loading: true});
        this.getTable()

    }


    goTo = async submenu => {
        let kind_unit_id = this.props.navigation.getParam('kind_unit_id');
        let zone_id = submenu.id;
        await query(`INSERT OR
                     REPLACE
                     INTO kind_unit_zones (id, kind_unit_id, zone_id)
                     VALUES ((SELECT id FROM kind_unit_zones WHERE kind_unit_id = ? AND zone_id = ?), ?, ?);`,
            [kind_unit_id, zone_id, kind_unit_id, zone_id]);
        if(this.props.screenProps.isConnected){
            await checkDataTable('kind_unit_zones').then(console.log('synced kind_unit_zones'));
        }
        await query(`select seq as kind_unit_zone_id
                     from sqlite_sequence
                     where name = "kind_unit_zones"`).then(res => {
            this.props.navigation.navigate(submenu.screen, {
                zoneTitle: submenu.screen,
                unit: this.props.navigation.getParam('unit', 'Unit Name'),
                zone_id: zone_id,
                kind_unit_zone_id: res[0].kind_unit_zone_id,
            })
        })
    };

    render() {
        const {submenus, loading} = this.state;
        return (
            <View style={styles.container}>


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

                        <Button mode="contained" style={{marginHorizontal: 10}}>Save</Button>
                        <Button mode="contained">Upload</Button>
                        <Button mode="contained" style={{marginHorizontal: 10}}>Back</Button>
                        <Button mode="contained">Finish</Button>

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
