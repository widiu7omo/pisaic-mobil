import React from 'react';
import {Text, View, FlatList, ScrollView, WebView} from 'react-native'
import query from '../../database/query';
import {Button} from "react-native-paper";
import {FileSystem, Linking, WebBrowser} from 'expo'
import { CameraRoll } from 'react-native';

// import RNFetchBlob from "rn-fetch-blob";


export default class PisheetDbScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pisheetData: []
        }
        // const dirs = RNFetchBlob.fs.dirs
        // console.log(dirs.DocumentDir)
        // console.log(dirs.CacheDir)
        // console.log(dirs.DCIMDir)
        // console.log(dirs.DownloadDir)
    }

    componentDidMount() {
        query(`select *
               from main.group_kind_unit_zones `, [])
            .then(res => {
                    console.log('data ready');
                    this.setState({pisheetData: res})
                }
            )
    }

    parsingData = async () => {
        return this.state.pisheetData.map((group) => {
            const parsedInput = JSON.parse(group.input_items);
            return {...group, input_items: parsedInput}

        });
    };
    Download = async () => {
        let file = await this.parsingData();
        const items = file;
        delete items.input_items;
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(items[0]);
        let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        csv = csv.join('\r\n');

        let inputCsv = file.forEach(element=>{
            const header = Object.keys(element.input_items[0]);
            let inputCSVV = element.input_items.map(row=>header.map(field=>JSON.stringify(row[field],replacer)));
            inputCSVV.unshift(header.join(','));
            inputCSVV = inputCSVV.join('\r\n');
            console.log(inputCSVV)
        });

        console.log(inputCsv);
        console.log(csv);
        // let parsedFile = JSON.stringify(file);
        let newFile = FileSystem.documentDirectory + 'newFile.txt';
        FileSystem.writeAsStringAsync(newFile, csv);
        CameraRoll.saveToCameraRoll( newFile, 'photo');
        // WebBrowser.openBrowserAsync('file:///newfile.txt');
        // FileSystem.getInfoAsync(newFile).then(res => {
        //         FileSystem.moveAsync({from: res.uri,to:toLocation+'/newFile.txt'});
        //         console.log(res)
        //     }
        // );
    };

    render() {
        const {pisheetData} = this.state;


        // console.log(newPisheetData);

        return (
            <ScrollView style={{flex: 1}}>
                <Button onPress={() => this.Download()}>Download</Button>
            </ScrollView>
        )
    }
}