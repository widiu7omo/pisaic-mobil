import React from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import {Button} from "react-native-paper";

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
                {name: "Clear database", action: 'clear'},
                {name: "Prepare database", action: 'prepare'},
            ]
        }
    }

    componentDidMount() {

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
                                <Button mode="contained">{item.action}</Button>
                            </View>
                        )}
                        keyExtractor={(item)=>item.name}
                    />
            </View>
        );
    }
}