import React from 'react'
import {View, StyleSheet, Image, Text, ScrollView, FlatList} from 'react-native'
import {Button} from 'react-native-paper'
import CustomHeader from '../../components/CustomHeader'

export default class IndexSubmenuScreen extends React.Component {
    constructor(props) {
        super(props);
        //props
        this.state = {
            menus: [
                {name: 'Periodic Inspection Sheet', screen: 'PeriodicInspection'},
                {name: 'Inspection Camera', screen: 'InspectCamera'},
                {name: 'Problem Log', screen: 'ProblemLogScreen'},
                {name: 'Backlog Entry Sheet', screen: 'BacklogEntry'},
                {name: 'Backlog Monitoring Sheet', screen: 'BacklogMonitor'},
                {name: 'Cylinder Daily Check Sheet', screen: 'CylinderDaily'}
            ]
        }

    }

    static navigationOptions = {
        //sub menu, the header name param is unitName
        headerTitle: <CustomHeader headerName="unitName"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };

    goTo = menu =>{
        this.props.navigation.navigate(menu.screen,{subMenuTitle:menu.name,unit:this.props.navigation.getParam('unitName')})
    };
    render() {
        const {menus} = this.state;
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
                    <FlatList data={menus}
                              renderItem={({item}) => {
                                  return (<Button style={styles.menusContent} mode="contained"
                                                  onPress={() => this.goTo(item)}>{item.name}</Button>)
                              }}
                              extraData={this.state}
                              keyExtractor={(item) => item.name}>
                    </FlatList>
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