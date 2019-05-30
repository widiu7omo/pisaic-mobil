import React from 'react';
import {View, Text, StyleSheet, FlatList,Alert} from "react-native";
import {Button} from "react-native-paper";
import query from '../../database/query'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
});
export default class indexScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingItems: [
                {name: "Clear database", action: 'clear',button:'clear'},
                {name: "Prepare database", action: 'prepare',button:'prepare'},
            ]
        }
    }

    action(item){
        switch (item.action) {
            case 'clear':
                this.clear();
                break;
            case 'prepare':
                break;
            default:return;

        }
    }
    async clear(){
        await query(`SELECT name FROM sqlite_master WHERE type='table'`).then(res=>{
            let success = false;
            res.forEach(async table=>{
                if(table.name !== 'sqlite_sequence'
                    && table.name !== 'groups'
                    && table.name !== 'kinds'
                    && table.name !== 'zones'){
                    await query(`DROP TABLE IF EXISTS ${table.name}`).then(()=>
                        Alert.alert('Success',"All tables are droped. re-launch your app"))
                }
            });
        })
    }
    static navigationOptions = {
        headerTitle: "Settings",
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };

    render() {
        return (
            <View style={styles.container}>
                    <FlatList
                        data={this.state.settingItems}
                        renderItem={({item,index}) => (
                            <View style={{flexDirection: "row", justifyContent: "space-between",marginBottom: 10}}>
                                <Text style={{fontSize: 20, fontWeight: "500"}}>{item.name}</Text>
                                <Button mode="contained" onPress={()=>this.action(item)}>{item.action}</Button>
                            </View>
                        )}
                        keyExtractor={(item)=>item.name}
                    />
            </View>
        );
    }
}