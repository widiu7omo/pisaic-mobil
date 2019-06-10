import React from 'react'
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {Button, Card, RadioButton, TextInput} from 'react-native-paper'
import CustomHeader from '../../components/CustomHeader'
import Colors from "../../constants/Colors";
import KeyboardShift from "../../components/KeyboardShift";
import {normalize} from "../../constants/FontSize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    inputField: {
        flexDirection: 'column',
        padding: 10,
        paddingBottom: 20
    },
    subContainer: {
        flexDirection: 'row'
    },
    colFlexStart: {flexDirection: "column", justifyContent: "flex-start"},
    rowFlexStart: {flexDirection: "row", justifyContent: "flex-start"},
    beforePicker: {
        marginBottom: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    viewFoto: {
        marginBottom: 10,
        fontSize: normalize(15),
        fontWeight: "600"
    },
    pickerBold: {
        fontSize: normalize(15),
        fontWeight: "600"
    },
    bannerText: {
        backgroundColor: "#F09445",
        textAlign: 'center',
        height: 45,
        padding: 8,
        fontSize:normalize(14),
        fontWeight:"500"
    }
});
export default class CreateNewPiScreeen extends React.Component {
    static navigationOptions = {
        headerTitle: <CustomHeader headerName="headerTitle"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            units: ['Bulldozer', 'Hydraulic Excavator', 'Wheel Loader', 'Tadano Crane', 'Scania', 'Motor Grader', 'Dump Truck']
        };
    }

    goTo = async (unit) => {
        this.props.navigation.navigate('Maintain', {'title': unit})
    };

    render() {
        const {loading, units} = this.state;
        return (
            <KeyboardShift>
                {() => (
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.bannerText}>Select Unit Type</Text>
                        </View>
                        {
                            loading ? <ActivityIndicator size="large" color={Colors.darkColor}/> :
                                <ScrollView style={styles.inputField}>
                                    <View style={{
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        marginVertical: 10,
                                        padding: 10
                                    }}>

                                        {
                                            units.map((unit, key) => (
                                                <Button style={{margin: 10}} key={key} mode='contained'
                                                        onPress={() => this.goTo(unit)}>{unit}</Button>
                                            ))
                                        }

                                    </View>
                                </ScrollView>
                        }
                    </View>
                )}
            </KeyboardShift>
        )
    }
}
