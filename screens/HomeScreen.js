import React from 'react'
import {View, Text, Image,AsyncStorage, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import {Button} from 'react-native-paper';
import Colors from '../constants/Colors'

class LogoTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    //buat header atas
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Image
                        source={require('../assets/images/iconut.png')}
                        style={{marginHorizontal: 5, width: 40, height: 40}}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>United Tractors</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 10, fontWeight: '100',}}>member of </Text>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>ASTRA</Text>
                    </View>

                </View>
            </View>
        )
    }
}

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        // title: "United Tractor",
        return {
            headerTitle: <LogoTitle navigation={navigation}/>,
            headerStyle: {backgroundColor: "#FEDA01"}
        }
    };

    constructor(props) {
        super(props);
        //admin menu, workorder,cek status,goto pi, create pi
        //spv menu, give order,cek status,goto pi
        this.state = {
            menus: [
                {name: 'Work Order & Others', screen: 'Workorder'},
                {name: 'Cek Status Progress PI', screen: 'Workorder'},
                {name: 'Go To PI', screen: 'ListUnit'},
                {name: 'Create New PI', screen: 'CreateNewPi'},
                {name: 'Give Order', screen: ''}
            ],
            level: ''
        }
    }

    componentDidMount = async () => {
       const level = await AsyncStorage.getItem('level');
       this.setState({level:level});
    };

    _getIndex = (items, forLooking) => {
        //array must be object with index name
        return items.findIndex(item => item.name === forLooking)
    };
    goTo = async (menu) => {
        await this.props.navigation.navigate(menu.screen, {headerTitle: menu.name})
    };
    render() {
        const textColor = Colors.primaryColor;
        let index = null;
        const {menus,level} = this.state;
        console.log(this.state);
        if (level === 'admin') {
            index = this._getIndex(menus, 'Give Order');
            menus.splice(index, 1)
        } else if (level === 'spv') {
            index = this._getIndex(menus, 'Create New PI');
            menus.splice(index, 1);
            index = this._getIndex(menus, 'Work Order & Others');
            menus.splice(index, 1)
        } else if (level === 'mekanik') {
            index = this._getIndex(menus, 'Create New PI');
            menus.splice(index, 1);
            index = this._getIndex(menus, 'Work Order & Others');
            menus.splice(index, 1)
        }
        return (

            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Image style={{height: 200, padding: 0}}
                           source={{
                               uri: 'https://facebook.github.io/react/logo-og.png',
                               method: 'POST'
                           }}>
                    </Image>
                    <View style={styles.bordered}>
                        <Text style={{color: `${textColor}`, fontSize: 25, fontWeight: 'bold'}}>PISAIC</Text>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <FlatList data={menus}
                              renderItem={({item}) => {
                                  return (<Button style={styles.button} mode="contained"
                                                  onPress={() => this.goTo(item)}>{item.name}</Button>)
                              }}
                              extraData={this.state}
                              keyExtractor={(item) => item.name}>
                    </FlatList>
                </View>
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1
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
        subContainer: {

            flexDirection: 'column'
        },
        button: {
            margin: 10
        }
    });