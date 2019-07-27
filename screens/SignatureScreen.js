import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions, ScrollView} from 'react-native';
import Signature from 'react-native-signature-canvas';
import {TextInput} from "react-native-paper";
import CustomHeader from "../components/CustomHeader";


export default class SignatureScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signature: null,
            name: ''
        };
    }

    static navigationOptions = {
        headerTitle: <CustomHeader headerName="header"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };

    handleSignature = async signature => {
        await this.setState({signature});
        await this.props.navigation.state.params.onGoBack(this.state);
        await this.props.navigation.goBack();
    };

    render() {
        const style = `.m-signature-pad--footer
    .button {
      background-color: grey;
      color: #FFF;
    }`;
        const nav = this.props.navigation;
        return (
            <ScrollView style={{flex: 1, padding: 10}}>
                <Text style={{marginBottom: 10}}>{nav.getParam('title')}</Text>
                {/*<View style={styles.preview}>*/}
                {/*    {this.state.signature ? (*/}
                {/*        <Image*/}
                {/*            resizeMode={"contain"}*/}
                {/*            style={{width: Math.round(Dimensions.get('window').width), height: 114}}*/}
                {/*            source={{uri: this.state.signature}}*/}
                {/*        />*/}
                {/*    ) : null}*/}
                {/*</View>*/}
                <TextInput style={{marginBottom:10}} mode="outlined" placeholder='Tuliskan nama' value={this.state.name}
                           onChangeText={val => this.setState({name: val})}/>
                <Signature
                    onOK={this.handleSignature}
                    descriptionText="Tanda tangan di atas sini"
                    clearText="Clear"
                    confirmText="Save"
                    webStyle={style}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    preview: {
        width: Math.round(Dimensions.get('window').width),
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10
    }
});