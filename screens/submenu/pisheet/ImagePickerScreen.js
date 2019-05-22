import React from 'react';
import {Alert, ScrollView, View, Platform, Image, TouchableOpacity} from 'react-native';
import {ImagePicker, Permissions, ImageManipulator} from 'expo';
import {NavigationEvents} from 'react-navigation';
import CustomHeader from "../../../components/CustomHeader";
import {Title, Button, Card, Avatar, TextInput} from "react-native-paper";
import {Ionicons} from '@expo/vector-icons';
import Colors from "../../../constants/Colors";

export default class ImagePickerScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <CustomHeader headerName="zonekind"/>,
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

    async componentDidFocus() {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    _compressImage = async (uri) =>{
        const CompressedImage = await ImageManipulator.manipulateAsync(uri,[],{compress:0.6});
        // console.log(CompressedImage);
        //return promise
        return CompressedImage;
    };
    render() {
        const showCamera = async () => {
            let result = await ImagePicker.launchCameraAsync({});
            if (result.cancelled) {
                this.setState({selection: null});
            } else {
                this.setState({selection: result});
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
                resultImage.then(result=>
                    //compressed image that store to database
                    console.log(result));
                this.setState({selection: result});
                const dataFoto = {...this.state.dataFoto};
                dataFoto.uri = result.uri;
                this.setState({dataFoto});
            }
        };
        return (
            <ScrollView style={{padding: 10}}>
                <NavigationEvents onDidFocus={this.componentDidFocus}/>
                <View style={{margin: 5}}>
                    {
                        this.CardPhoto(showCamera, showPicker)
                    }
                </View>

            </ScrollView>
        );
    }

    CardPhoto = (camera, picker) => (
        <View style={{flexDirection: "column",paddingBottom: 20}}>
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
            <View style={{flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end",marginTop:15}}>
                <Button mode="contained" style={{marginLeft: 5}} onPress={() => this.props.navigation.goBack()}>Kembali</Button>
                <Button mode="contained" style={{marginLeft: 5}} onPress={() => Alert.alert(JSON.stringify(this.state.dataFoto))}> Simpan</Button>
            </View>
        </View>
    );
    _maybeRenderSelection = () => {
        const {selection,dataFoto} = this.state;

        if (!selection) {
            return;
        }
        const media =
            selection.type === 'video' ? (
                <Video
                    source={{uri: selection.uri}}
                    style={{width: 300, height: 300}}
                    resizeMode="contain"
                    shouldPlay
                    isLooping
                />
            ) : (
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
