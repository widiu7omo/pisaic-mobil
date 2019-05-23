import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import {Button} from 'react-native-paper'
import {ViewPagerAndroid} from 'react-native-gesture-handler';
import CustomHeader from "../../../components/CustomHeader";
import {zones} from "../../../constants/Default_zones";

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
            submenus:[]
        }
    }
    componentDidMount() {
        this.setState({submenus:zones})
    }

    goTo = submenu => {
        this.props.navigation.navigate(submenu.screen, {
            zoneTitle: submenu.screen,
            unit: this.props.navigation.getParam('unit', 'Unit Name')
        })
    };
    render() {
        const {submenus} = this.state;
        return (
            <View style={styles.container}>


                <ScrollView style={styles.inputField}>
                    {
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
