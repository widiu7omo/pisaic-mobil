import React from 'react';
import {Text, View, Platform, WebView, Alert, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native'
import query from '../../database/query';
// import {WebView} from "react-native-webview";
import {ActivityIndicator, Button} from "react-native-paper";
import * as Print from "expo-print";
import {apiUri} from "../../constants/config";

// import RNFetchBlob from "rn-fetch-blob";

class LogoTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Image
                        source={require('../../assets/images/iconut.png')}
                        style={{marginHorizontal: 5, width: 40, height: 40}}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>Cetak Pisheet DB</Text>
                </View>
            </View>
        )
    }
}

export default class PisheetDbScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pisheetData: [],
            visible: true,
        }
    }

    static navigationOptions = ({navigation}) => {
        // title: "United Tractor",
        return {
            headerTitle: <LogoTitle navigation={navigation}/>,
            headerStyle: {backgroundColor: "#FEDA01"}
        }
    };

    componentDidMount() {
        query(`select *
               from main.group_kind_unit_zones `, [])
            .then(res => {
                    console.log('data ready');
                    this.setState({pisheetData: res})
                }
            )
    }

    _printHTMLToPDF = async () => {

        try {
            let response = await fetch('https://pisaic.dioinstant.com/print.php', {method: 'GET'}).then((res) => res.text());
            let pdf = await Print.printToFileAsync({
                html: response,
                // uri:`https://pisaic.dioinstant.com/print.php`
            });
            Alert.alert('Successfully printed to PDF', 'Do you want to print this file to the printer?', [
                {
                    text: 'No',
                    onPress: () => {
                    },
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        Print.printAsync({
                            uri: pdf.uri,
                        });
                    },
                },
            ]);
        } catch (e) {
            Alert.alert('Something went wrong: ', e.message);
        }
    };

    showLoad() {
        this.setState({visible: true});
    }

    hideLoad() {
        this.setState({visible: false});
    }

    ActivityIndicatorLoadingView() {
        return (
            <ActivityIndicator
                color='#009688'
                size='large'
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    render() {

        return (

            <WebView
                style={styles.WebViewStyle}
                source={{uri: 'https://pisaic.dioinstant.com'}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                renderLoading={this.ActivityIndicatorLoadingView}
                startInLoadingState={true}
            />

        );
    }

}
const styles = StyleSheet.create({
    WebViewStyle:
        {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginTop: (Platform.OS) === 'ios' ? 20 : 0
        },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});
