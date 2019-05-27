import React from 'react'
import {View, StyleSheet, Image, Text, ScrollView, FlatList, ActivityIndicator} from 'react-native'
import {Button} from 'react-native-paper'
import CustomHeader from '../../components/CustomHeader'
import query from '../../database/query'
import {kinds} from '../../constants/Default_kinds';
import Colors from "../../constants/Colors";

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
        //insert first
       await query(`INSERT OR
               REPLACE
               INTO kind_units (id, kind_id, unit_id)
               VALUES ((SELECT id FROM kind_units WHERE kind_id = ? AND unit_id = ?), ?, ?);`,
            [kind_id, unit_id, kind_id, unit_id]);
        //retrive last id
        await query(`select seq as kind_unit_id 
               from sqlite_sequence
               where name = "kind_units"`).then(res => {
                   // console.log(res);
            this.props.navigation.navigate(menu.screen, {
                subMenuTitle: menu.name,
                idKind: kind_id,
                idUnit: unit_id,
                kind_unit_id:res[0].kind_unit_id,
                unit: this.props.navigation.getParam('unitName')

            });

        })


    };

    render() {
        const {menus, loading} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Image style={{height: 200, padding: 0}}
                           source={{
                               uri: 'https://facebook.github.io/react/logo-og.png',
                               method: 'POST'
                           }}>
                    </Image>
                    <View style={styles.bordered}>
                        <Text style={{color: '#FEDA01', fontSize: 25, fontWeight: 'bold'}}>PISAIC</Text>
                    </View>
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