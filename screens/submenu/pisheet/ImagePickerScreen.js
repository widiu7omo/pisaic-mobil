import React from 'react';
import {Alert, AsyncStorage, Image, Platform, ScrollView, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import * as Permissions from 'expo-permissions'
import {NavigationEvents} from 'react-navigation';
import CustomHeader from "../../../components/CustomHeader";
import {Button, Card, TextInput} from "react-native-paper";
import {Ionicons} from '@expo/vector-icons';
import Colors from "../../../constants/Colors";
import KeyboardShift from "../../../components/KeyboardShift";

export default class ImagePickerScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <CustomHeader headerName="groupItem"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };
    state = {
        selection: null,
        dataFoto: {
            catatanFoto: '',
            uri: ''
        }
    };

    constructor(props) {
        super(props);
        AsyncStorage.removeItem('dataFoto');
    }

    componentWillMount() {
        let prevDataFoto = this.props.navigation.getParam('prevDataFoto');
        let parsedDataFoto = prevDataFoto;

        if(parsedDataFoto.name !== ""){
            let selection = Object.assign({uri:parsedDataFoto.name});
            this.setState({dataFoto:parsedDataFoto});
            this.setState({selection});
            console.log(selection);
        }
    }

    async componentDidFocus() {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    _compressImage = async (uri) => {
        // console.log(CompressedImage);
        //return promise
        return await ImageManipulator.manipulateAsync(uri, [], {compress: 0.6});
    };
    _saveFoto = async (dataFoto) => {
        console.log(dataFoto);
        if(dataFoto.catatanFoto === ""){
            Alert.alert('Alert','catatan foto tidak boleh kosong');
            return;
        }
        if(dataFoto.uri === ""){
            Alert.alert('Alert','Foto tidak boleh kosong');
            return;
        }
        dataFoto['indexItem'] = this.props.navigation.getParam('indexItem');
        dataFoto['kind_unit_zone_id'] = this.props.navigation.getParam('kind_unit_zone_id');

        let foto = JSON.stringify(dataFoto);
        await AsyncStorage.setItem('dataFoto', foto);
        await this.props.navigation.state.params.onGoBack();
        await Alert.alert('Success',"Foto Tersimpan",[{text:'OK',onPress:()=>this.props.navigation.goBack()}])
        // this.props.navigation.goBack();
    };

    render() {
        const showCamera = async () => {
            let result = await ImagePicker.launchCameraAsync({});
            if (result.cancelled) {
                this.setState({selection: null});
            } else {
                const resultImage = this._compressImage(result.uri);
                //resultImage return promise
                await resultImage.then(compressedJpg => {
                    //compressed image
                    this.setState({selection: compressedJpg});
                    const dataFoto = {...this.state.dataFoto};
                    dataFoto.uri = compressedJpg.uri;
                    this.setState({dataFoto});
                    console.log(this.state);
                });
                // this.setState({selection: result});
            }
        };
        const showPicker = async () => {
            if (Platform.OS === 'ios') {
                let permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
                if (permission.status !== 'granted') {
                    setTimeout(() => Alert.alert('Camera roll permission was not granted.'), 100);
                    return;
                }
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });
            if (result.cancelled) {
                this.setState({selection: null});
            } else {
                const resultImage = this._compressImage(result.uri);
                //resultImage return promise
                await resultImage.then(compressedJpg => {
                    //compressed image
                    this.setState({selection: compressedJpg});
                    const dataFoto = {...this.state.dataFoto};
                    dataFoto.uri = compressedJpg.uri;
                    this.setState({dataFoto});
                });

            }
        };
        return (
            <KeyboardShift>
                {() => (
                    <ScrollView style={{padding: 10}}>
                        <NavigationEvents onDidFocus={this.componentDidFocus}/>
                        <View style={{margin: 5}}>
                            {
                                this.CardPhoto(showCamera, showPicker)
                            }
                        </View>

                    </ScrollView>
                )}
            </KeyboardShift>
        );
    }

    CardPhoto = (camera, picker) => (
        <View style={{flexDirection: "column", paddingBottom: 20}}>
            <Card elevation={2}>
                <Card.Title title="Foto Component" subtitle="Pilih Foto"/>
                <Card.Content>
                    {
                        this.state.selection ?
                            this._maybeRenderSelection()
                            :
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                <Ionicons name="md-camera" size={80} color={Colors.darkColor}/>
                            </View>
                    }
                </Card.Content>
                <Card.Actions>
                    <Button mode="text" onPress={camera}>Camera</Button>
                    <Button mode="text" onPress={picker}>Gallery</Button>
                </Card.Actions>
            </Card>
            <TextInput multiline={true} value={this.state.dataFoto.catatanFoto}
                       onChangeText={(catatanFoto) => {
                           let {dataFoto} = this.state;
                           dataFoto = {...dataFoto, catatanFoto: catatanFoto};
                           this.setState({dataFoto})
                       }}
                       label="Catatan" mode="outlined" style={{height: 200}}/>
            <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", marginTop: 15}}>
                <Button mode="contained" style={{marginLeft: 5}}
                        onPress={() => this.props.navigation.goBack()}>Kembali</Button>
                <Button mode="contained" style={{marginLeft: 5}}
                        onPress={() => this._saveFoto(this.state.dataFoto)}> Simpan</Button>
            </View>
        </View>
    );
    _maybeRenderSelection = () => {
        const {selection} = this.state;

        if (!selection) {
            return;
        }
        const media =
            (
                <Image
                    source={{uri: selection.uri}}
                    style={{width: 300, height: 300, resizeMode: 'contain'}}
                />
            );
        return (
            <View style={{marginVertical: 16}}>
                <View
                    style={{
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        backgroundColor: '#000000',
                    }}>
                    {media}
                </View>
            </View>
        );
    };
}
