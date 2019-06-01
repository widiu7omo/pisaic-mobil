import * as React from 'react';
import { View } from 'react-native';
import {Paragraph, Dialog, Portal, ActivityIndicator} from 'react-native-paper';

export default class LoadingDialog extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View>
                <Portal>
                    <Dialog
                        visible={this.props.visible}
                        dismissable={false}>
                        <Dialog.Title>Please Wait...</Dialog.Title>
                        <Dialog.Content>
                            <ActivityIndicator/>
                            <Paragraph>{this.props.message}</Paragraph>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}