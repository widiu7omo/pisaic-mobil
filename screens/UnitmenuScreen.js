import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';

export default class UnitmenuScreen extends React.Component{
    
    constructor(){
        super();
        //props
        this.menus = [
            'Periodic Inspection Sheet',
            'Inspection Camera',
            'Problem Log',
            'Backlog Entry Sheet',
            'Backlog Monitoring Sheet',
            'Cylinder Daily Check Sheet'
        ]
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('unitName','Nama Unit...')
        }
    }
    render(){
        return(
           <View style={styles.container}>
            <ScrollView>
                {
                    this.menus.map((menu, key) => (
                        <View key={key} style={styles.menusContent}>
                            <Button mode="outlined" onPress = {() => this.props.navigation.navigate('Screen')}>{menu}</Button>
                        </View>
                    ))
                }
            </ScrollView>
           </View> 
        )
    }

}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop:20,
    },
    menusContent: {
        padding:10
    }
})