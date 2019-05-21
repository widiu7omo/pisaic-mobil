import React from 'react';
import { AsyncStorage,View } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { Button } from 'react-native-paper';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <ExpoConfigView />
        <Button onPress={this._signOutAsync}>Logout</Button>
    </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
