import React, {useState} from 'react'
import {Alert, View, StyleSheet, ScrollView, Text, TouchableOpacity, Picker} from 'react-native'
import {Button, TextInput} from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import query from '../../../database/query'
import {ID} from "../../../constants/Unique";
import {checkDataTable} from "../../../constants/Data_to_update";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputField: {
        flexDirection: 'column',
        padding: 10,
    }
});

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
                    }}>{this.props.navigation.getParam('headerTitle', 'Nama Menu...')}</Text>
                </View>
            </View>
        )
    }
}

export default class WorkorderViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <LogoTitle navigation={navigation}/>,
            headerStyle: {backgroundColor: "#FEDA01"},
            headerIcon: null,
        }
    };

    componentDidMount() {
        let unit_id = this.props.navigation.getParam('idUnit', 'id Unit')
        console.log(unit_id);
        query(`SELECT * FROM workorders WHERE unit_id = '${unit_id}'`).then(res => {
            console.log('lagi mount');
            console.log(res);
            this.setState({units: res})
        })

    }

    constructor(props) {
        super(props);
        this.state = {
            inputItems: {
                date: "20-12-2019",
                wono: '',
                refisisr: '',
                pocust: '',
                prodname: '',
                modelunit: '',
                modelengine: '',
                estjob: '',
                note: '',
                ttdsdh: '',
                unit_id: ''
            },
            units: []
        }
    }

    goTo = async () => {
        this.props.navigation.navigate('DigitalSignature',
            {
                'header': "Form Tanda tangan",
                'title':"Service  Dept.  Head",
                onGoBack: (param) => this.getSignature(param)
            });
    };

    getSignature(signature) {
        console.log(signature);
        this.state.inputItems.ttdsdh = signature;
        console.log(this.state.inputItems);
    }

    _saveInput = async () => {
        const input_data = JSON.stringify(this.state.inputItems);
        const unit_id = this.state.inputItems.unit_id;
        if (unit_id !== '') {
            await query(`SELECT id
                     FROM workorders
                     WHERE unit_id = ? `, [unit_id])
                .then(async res => {
                    // console.log('hasil dari db lokal');
                    //generate new id
                    let wo_id = ID();
                    //if found
                    if (res.length > 0) {
                        //replace generated id with existing id
                        wo_id = res[0].id;
                    }
                    //insert or replace with kind_unit_id
                    await query(`INSERT OR
                             REPLACE
                             INTO workorders (id, unit_id,input_data)
                             VALUES (?, ?, ?);`, [wo_id, unit_id, input_data])
                        .then(() => {
                            // query(`select * from group_kind_unit_zones`).then(res=>console.log(res));
                            Alert.alert('Success', 'Data berhasil tersimpan')
                        });

                    if (this.props.screenProps.isConnected) {
                        await checkDataTable('workorders').then(console.log('synced workorders'));
                    }


                });
        }
    };

    render() {
        const {inputItems} = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.inputField}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                        <Text style={{margin:10}}>Tanggal Order</Text>
                        <DatePicker
                            date={inputItems.date}
                            format="DD-MM-YYYY"
                            placeholder="Pilih tanggal"
                            showIcon={true}
                            onDateChange={(date) => {
                                inputItems.date = date;
                                this.setState({inputItems})
                            }}/>
                    </View>
                    <TextInput value={inputItems.wono}
                               onChangeText={(wono) => {
                                   inputItems.wono = wono;
                                   this.setState({inputItems})
                               }} label="WO No."
                               mode="outlined"/>
                    <TextInput value={inputItems.refisisr}
                               onChangeText={(refisisr) => {
                                   inputItems.refisisr = refisisr
                                   this.setState({inputItems})
                               }}
                               label="Refisi SR" mode="outlined"/>
                    <TextInput value={inputItems.pocust}
                               onChangeText={(pocust) => {
                                   inputItems.pocust = pocust
                                   this.setState({inputItems})
                               }}
                               label="PO Cust." mode="outlined"/>
                    <TextInput value={inputItems.prodname}
                               onChangeText={(prodname) => {
                                   inputItems.prodname = prodname;
                                   this.setState({inputItems})
                               }}
                               label="Product Name" mode="outlined"/>
                    <TextInput value={inputItems.modelunit}
                               onChangeText={(modelunit) => {
                                   inputItems.modelunit = modelunit;
                                   this.setState({inputItems})
                               }}
                               label="Model Unit/ Equipment No." mode="outlined"/>
                    <TextInput value={inputItems.modelengine}
                               onChangeText={(modelengine) => {
                                   inputItems.modelengine = modelengine;
                                   this.setState({inputItems})
                               }}
                               label="Model Engine/ Equipment No." mode="outlined"/>
                    <TextInput value={inputItems.estjob}
                               onChangeText={(estjob) => {
                                   inputItems.estjob = estjob
                                   this.setState({inputItems})
                               }}
                               label="Estimasi Pekerjaan" mode="outlined"/>
                    <TextInput multiline={true} value={inputItems.note}
                               onChangeText={(note) => {
                                   inputItems.note = note;
                                   this.setState({inputItems})
                               }}
                               label="Catatan" mode="outlined" style={{height: 200}}/>
                    <View style={{
                        justifyContent: 'space-between',
                        marginTop: 20,
                        flexDirection: 'row',
                        paddingBottom: 20
                    }}>
                        <Button mode="contained" onPress={() => this.goTo()}>
                            TTD Sdh
                        </Button>
                        <Button icon="add-a-photo" mode="contained" onPress={() => this._saveInput()}>
                            Simpan
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
