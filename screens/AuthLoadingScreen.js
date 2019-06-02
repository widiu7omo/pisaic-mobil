import React from 'react';
import {
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,Text
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        //create master data if isUsed not yet been set,
        //if not, it will return to bootstrapAsync
        this._bootstrapAsync()
    }
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        // This will switch to the Main screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'Main' : 'Auth');

    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <Text style={{marginTop:15}}>Authenticating...</Text>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});