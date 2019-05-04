import DataunitScreen from '../screens/pisheet/Dataunit'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

const Zone3Stack = createStackNavigator({
    Dataunit:DataunitScreen,
    //A:AScreen 
    //B:BScreen
    //C:CScreen
    //D:DScreen
    //E:EScreen
},{
    initialRouteName:"Index" 
})
export default createStackNavigator({
    Zone1Stack
})


