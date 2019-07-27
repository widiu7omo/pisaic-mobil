import React from 'react'
import {Text, TouchableOpacity, Image, View, StyleSheet, FlatList} from 'react-native'
import {Button} from 'react-native-paper'
import Colors from "../constants/Colors";

import * as WebBrowser from "expo-web-browser";

class LogoTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Image
                        source={require('../assets/images/iconut.png')}
                        style={{marginHorizontal: 5, width: 40, height: 40}}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>Database Pisaic</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 10, fontWeight: '100',color:Colors.blueColor}}>member of </Text>
                        <Text style={{fontSize: 10, fontWeight: 'bold',color:Colors.blueColor}}>ASTRA</Text>
                    </View>

                </View>
            </View>
        )
    }
}

export default class DbPisaicScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [
                {name: 'Periodict Inspection Sheet', action: 'pisheet', screen: 'PisheetDb'},
                {name: 'Inspection Camera', action: 'ci', screen: ''},
                {name: 'Problem Log', action: '', screen: ''},
                {name: 'Backlog Entry Sheet', action: '', screen: ''},
                {name: 'Backlog Monitoring Sheet', action: '', screen: ''},
                {name: 'Cylinder Daily Check Sheet', action: '', screen: ''}
            ]
        }
    }

    static navigationOptions = ({navigation}) => {
        // title: "United Tractor",
        return {
            headerTitle: <LogoTitle navigation={navigation}/>,
            headerStyle: {backgroundColor: "#FEDA01"}
        }
    };

    handleOpenWebUrlClicked = async (uri) => {
        let url = `https://pisaic.dioinstant.com?uri=${uri}`;
        await WebBrowser.openBrowserAsync(url,{toolbarColor:Colors.primaryColor,showTitle:false});
        // setTimeout(() => Alert.alert('Result', JSON.stringify(result, null, 2)), 1000);
    }
    render() {
        const {menu} = this.state;
        return (
            <View style={styles.container}>
                {
                    <FlatList data={menu}
                              renderItem={({item, index}) => {
                                  return (
                                      <Button mode="contained" style={styles.subContainer}
                                              onPress={() => this.handleOpenWebUrlClicked(item.action)}>{item.name}</Button>
                                  )
                              }}
                              extraData={this.state}
                              keyExtractor={(item) => item.name}>

                    </FlatList>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        margin: 10,
        flexDirection: "column"
    }
});