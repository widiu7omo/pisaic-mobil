import React from 'react'
import {View, StyleSheet, ScrollView, FlatList, ActivityIndicator,Text,Image} from 'react-native'
import {Button, TextInput} from 'react-native-paper'
import CustomHeader from '../../../../components/CustomHeader'
import query from "../../../../database/query";
import Colors from "../../../../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

export default class IndexZone1Screen extends React.Component {
    static navigationOptions = {
        headerTitle: <CustomHeader headerName="zoneTitle"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            loading: false
        };
    }

    getTable = async () => {
        console.log(this.props.navigation.getParam('zone_id'));
        const zone_id = this.props.navigation.getParam('zone_id');
        await query(`select *
                     from groups
                     where zone_id = ?`, [zone_id])
            .then(result => {
                // console.log(result);
                this.setState({groups: result});
                this.setState({loading: false});
            })
    };

    componentDidMount() {
        console.log(this.props.navigation.getParam('kind_unit_zone_id'));
        this.setState({loading: true});
        this.getTable()

    }

    goTo = async submenu => {
        let kind_unit_zone_id = this.props.navigation.getParam('kind_unit_zone_id');
        let group_id = submenu.id;
        this.props.navigation.navigate(submenu.screen, {
            zone: submenu.name,
            unit: this.props.navigation.getParam('unit', 'Unit Name'),
            group_id: group_id,
            kind_unit_zone_id: kind_unit_zone_id,
        })
    };

    async componentWillUnmount() {
        await this.props.navigation.state.params.onGoBack();
    }
    render() {
        const {groups, loading} = this.state;
        return (
            <View style={styles.container}>
                {/* bring your input here */}
                {/* <Text>This is from workorder</Text> */}
                <View style={styles.contentContainer}>
                    <Image style={{width:wp('100%'),height:200, padding: 0}}
                           source={require('../../../../assets/images/banner5.jpg')}>
                    </Image>
                    <View style={styles.bordered}>
                        <View style={{backgroundColor:'#FEDA01',padding:5}}>
                            <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>PISAIC</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.inputField}>
                    {
                        loading ? <ActivityIndicator size={"large"} color={Colors.darkColor} style={{marginTop: 20}}/>
                            : <FlatList data={groups}
                                        renderItem={({item}) => {
                                            return (
                                                <View style={styles.submenu}>
                                                    <Button style={styles.button} mode="contained"
                                                            onPress={() => this.goTo(item)}>{item.name}</Button>

                                                </View>)
                                        }}
                                        extraData={this.state}
                                        keyExtractor={(item) => item.name}>
                            </FlatList>
                    }
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputField: {
        flexDirection: 'column',
        padding: 10,
    },
    button: {
        margin: 10
    }
});