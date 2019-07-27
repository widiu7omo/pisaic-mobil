import React from 'react'
import {
    Component,
    Image,
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    AsyncStorage,
    default as Dimensions, Alert, ActivityIndicator
} from 'react-native'
import {Signature} from 'expo-pixi';
import {Badge, Button, TextInput} from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import {ID} from "../../constants/Unique";
import KeyboardShift from "../../components/KeyboardShift";
import query from "../../database/query";
import {checkDataTable} from "../../constants/Data_to_update";
// import Signature from 'react-native-signature-canvas';

import input from "../../constants/Default_z1inputs";
import Colors from "../../constants/Colors";
import {Uploader} from "../../constants/Uploader";
import LoadingDialog from "../../components/LoadingDialog";

class LogoTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    {/* <Image
          source={require('../../assets/images/iconut.png')}
          style={{marginHorizontal:5,width:40,height:40}}/> */}
                </TouchableOpacity>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}>{this.props.navigation.getParam('unit', 'Nama Menu...')}</Text>
                    <Text>Unit Name</Text>
                </View>
            </View>
        )
    }
}

export default class InspectCameraScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <LogoTitle navigation={navigation}/>,
            headerStyle: {backgroundColor: "#FEDA01"},
            headerIcon: null,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            inputItems: [],
            signature: '',
            loading: false,
            imageQueue: 0,
            progress: false,
        };
        this.initialValues = {
            id: ID(),
            unit: this.props.navigation.getParam('unit'),
            date: '01-01-2000',
            id_pemeriksa: "",
            nama_komponen: "",
            foto: {name: '', catatan: ''},
            ttd: ""
        }
    }

    clearCanvas = () => {
        this.refs.signatureCanvas.clear()
    }

    saveCanvas = async () => {
        const sign_result = await this.refs.signatureCanvas.takeSnapshotAsync({
            format: 'png',
            quality: '0.5',
            result: uuidv4(),
        })
    }

    async componentDidMount() {
        let lengthQueue = 0;
        this.setState({loading: true});
        let imageQueue = await AsyncStorage.getItem('fotoQueueCI');
        if(imageQueue){
            lengthQueue = JSON.parse(imageQueue).length;
        }
        console.log(lengthQueue);
        this.setState({imageQueue: lengthQueue});
        let unit_id = this.props.navigation.getParam('unit');
        await query('SELECT * FROM camera_inspection WHERE unit_id = ?', [unit_id])
            .then(result => {
                this.setState({loading: false});
                let res = [...this.state.inputItems];
                if (result.length === 1) {
                    res = result[0].input_items;
                    const parsedRespond = JSON.parse(res);
                    this.setState({inputItems: parsedRespond});
                }
                // console.log(result)
            });
        if (this.state.inputItems.length === 0) {
            this.setState({
                inputItems: [{
                    id: ID(),
                    unit: this.props.navigation.getParam('unit'),
                    date: '01-01-2000',
                    id_pemeriksa: "",
                    nama_komponen: "",
                    foto: {name: '', catatan: ''},
                    ttd: ""
                }]
            });
        }
    }

    ImagePicker = async (item, index) => {
        await this.props.navigation.navigate('ImagePickerCI', {
            // groupItem: item.name,
            idUnit: this.props.navigation.getParam('idUnit'),
            indexItem: index,
            // prevDataFoto: item.foto,
            unit: this.props.navigation.getParam('unit'),
            onGoBack: () => this.getFromImagePicker()
        });
    };
    //excuted after user save photo
    getFromImagePicker = async () => {
        //Parsing picked image
        const dataFoto = await AsyncStorage.getItem('dataFotoCI');
        const parsedFoto = JSON.parse(dataFoto);
        console.log(parsedFoto);
        //get only image name with extension
        let getFotoName = parsedFoto.uri.split('/');
        let fotoName = getFotoName[getFotoName.length - 1];

        // matching foto with input items and push it
        let foto = {name: fotoName, catatan: parsedFoto.catatanFoto};
        const indexFoto = parsedFoto.indexItem;
        const inputItems = [...this.state.inputItems];
        inputItems[indexFoto] = {...inputItems[indexFoto], foto: foto};
        this.setState({inputItems});
        //not yet testing. TODO after this
        //initalize photoData

        let photoData =
            {
                uri: parsedFoto.uri,
                name: fotoName,
                unit: this.props.navigation.getParam('unit'),
                catatan: parsedFoto.catatanFoto,
            };
        //get queue foto
        let fotoQueue = await AsyncStorage.getItem('fotoQueueCI');
        let parsedFotoQueue = JSON.parse(fotoQueue);
        console.log(parsedFotoQueue);
        if (!parsedFotoQueue) {
            parsedFotoQueue = [];
        }
        parsedFotoQueue.push(photoData);
        await AsyncStorage.setItem('fotoQueueCI', JSON.stringify(parsedFotoQueue));

        console.log('foto queue join with new one');
        console.log(parsedFotoQueue);
        this.setState({imageQueue: parsedFotoQueue.length});
        // }

    };
    _saveInput = async () => {
        const input_data = JSON.stringify(this.state.inputItems);
        const unit_id = this.props.navigation.getParam('unit');
        if (unit_id !== '') {
            await query(`SELECT id
                         FROM camera_inspection
                         WHERE unit_id = ? `, [unit_id])
                .then(async res => {
                    // console.log('hasil dari db lokal');
                    //generate new id
                    let ci_id = ID();
                    //if found
                    if (res.length > 0) {
                        //replace generated id with existing id
                        ci_id = res[0].id;
                    }
                    //insert or replace with kind_unit_id
                    await query(`INSERT OR
                                 REPLACE
                                 INTO camera_inspection (id, unit_id, input_items)
                                 VALUES (?, ?, ?);`, [ci_id, unit_id, input_data])
                        .then(() => {
                            // query(`select * from group_kind_unit_zones`).then(res=>console.log(res));
                            Alert.alert('Success', 'Data berhasil tersimpan')
                        });
                    console.log(this.props);
                    if (this.props.screenProps.isConnected) {
                        await checkDataTable('camera_inspection').then(console.log('synced camera inspection'));
                    }


                });
        }
    }

    async _addItem() {
        let inputItems = [...this.state.inputItems];
        inputItems.push(this.initialValues);
        // console.log(inputItems);
        await this.setState({inputItems});

    }

    goToSignature = async (index) => {
        this.props.navigation.navigate('DigitalSignature',
            {
                'header': "Form Tanda tangan",
                'title': "Tanda tangan Camera Inspection",
                onGoBack: (param) => this.getSignature(param, index)
            });
    };

    getSignature(signature, index) {
        // console.log(signature);
        const inputItems = [...this.state.inputItems];
        inputItems[index] = {...inputItems[index], ttd: signature}
        this.setState({inputItems});
        // console.log(this.state.inputItems);
    }

    _uploadImage = async () => {
        const {isConnected} = this.props.navigation.getScreenProps();
        if (isConnected) {

            const fotoQueue = await AsyncStorage.getItem('fotoQueueCI');

            const parsedFotoQueue = JSON.parse(fotoQueue);
            console.log('connect with internet and retrive data from fotoQueue');
            // console.log(parsedFotoQueue);
            //filtering if any undefined value
            if (Array.isArray(parsedFotoQueue) && parsedFotoQueue.length > 0) {
                this.setState({progress: true});
                // console.log(parsedFotoQueue);
                let dataFotoQueue = [];

                parsedFotoQueue.forEach((foto, index) => {
                    if (typeof foto.uri !== "undefined") {
                        dataFotoQueue.push(foto)
                    }
                });
                console.log('filtering parsed Foto Queue')
                // console.log(dataFotoQueue);
                Uploader(dataFotoQueue).then(() => {
                    this.setState({progress: false});
                    AsyncStorage.setItem('fotoQueueCI', JSON.stringify([]));
                    this.setState({imageQueue: 0});
                })
            } else {
                Alert.alert('No Need Action', 'Data already uploaded. No need Action')
            }
        } else {
            Alert.alert('Fail', 'You\'re not connect to the internet');
        }

    };

    render() {
        const {imageQueue, loading} = this.state;
        const style = `.m-signature-pad--footer
                        .button {
                          background-color: grey;
                          color: #FFF;
                        }`;
        return (
            <KeyboardShift>
                {() => (
                    <View style={styles.container}>
                        {
                            loading ? <ActivityIndicator size="large" color={Colors.darkColor}/> :
                                <ScrollView style={styles.inputField}>
                                    <LoadingDialog visible={this.state.progress}
                                                   message={'Be patient. Uploading photos to server'}/>
                                    {
                                        this.state.inputItems.map((item, ix) => (
                                            <View key={ix}>
                                                <View style={{flexDirection: 'column'}}>
                                                    <Text>Tanggal Pemeriksaan: </Text>
                                                    <DatePicker
                                                        date={item.date}
                                                        format="DD-MM-YYYY"
                                                        placeholder="Tanggal Pemeriksaan"
                                                        showIcon={false}
                                                        onDateChange={(date) => {
                                                            const inputItems = [...this.state.inputItems];
                                                            inputItems[ix] = {...inputItems[ix], date: date};
                                                            this.setState({inputItems})
                                                        }}/>
                                                </View>
                                                <TextInput value={item.id_pemeriksa} onChangeText={(id_pemeriksa) => {
                                                    const inputItems = [...this.state.inputItems];
                                                    inputItems[ix] = {...inputItems[ix], id_pemeriksa: id_pemeriksa};
                                                    this.setState({inputItems})
                                                }}
                                                           label="Identitas Pemeriksa" mode="outlined"/>
                                                <TextInput value={item.nama_komponen} onChangeText={(nama_komponen) => {
                                                    const inputItems = [...this.state.inputItems];
                                                    inputItems[ix] = {...inputItems[ix], nama_komponen: nama_komponen}
                                                    this.setState({inputItems})
                                                }}
                                                           label="Nama Komponen" mode="outlined"/>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    marginVertical: 10,
                                                }}>
                                                    <Button icon="add-a-photo" dark={true}
                                                            mode="contained" style={{marginRight: 10}}
                                                            onPress={() => this.ImagePicker(item, ix)}>Foto</Button>
                                                    <Button icon="create" dark={true}
                                                            mode="contained"
                                                            onPress={() => this.goToSignature(ix)}>TTD</Button>
                                                </View>
                                            </View>
                                        ))
                                    }
                                    {
                                        <View style={{
                                            marginTop: 20,
                                            marginLeft: 0,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start'
                                        }}>
                                            <Button icon="keyboard-arrow-left" mode="contained"
                                                    onPress={() => this._addItem()}>Create
                                                New</Button>
                                        </View>
                                    }
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            marginVertical: 10,
                                            padding: 10
                                        }}>

                                        <Button mode="contained" style={{marginHorizontal: 10}}
                                                onPress={() => this._saveInput()}>Save</Button>
                                        <Button mode="contained" onPress={() => this._uploadImage()}
                                                style={{backgroundColor: this.state.imageQueue > 0 ? Colors.danger : Colors.success}}>Upload
                                            ({this.state.imageQueue})</Button>
                                        <Button mode="contained" style={{marginHorizontal: 10}}
                                                onPress={() => this.props.navigation.goBack()}>Back</Button>
                                        <Button mode="contained"
                                                onPress={() => this.props.navigation.goBack()}>Finish</Button>
                                    </View>
                                </ScrollView>
                        }

                    </View>)
                }
            </KeyboardShift>
        )
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1
        },
        inputField: {
            flexDirection: 'column',
            padding: 10,
        },
        sketch: {
            flex: 1,
        },
        sketchContainer: {
            height: '50%',
        },
        image: {
            flex: 1,
        },
        badge: {
            position: 'absolute',
            top: 1,
            right: 1,
            minWidth: 20,
            height: 20,
            zIndex: 999,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FF0000'
        }
    });