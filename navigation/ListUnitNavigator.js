import ListUnitScreen from '../screens/ListUnitScreen'
import UnitMenuNavigator from './UnitMenuNavigator'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

//Show Units menu
//Menu in every Unit Workorder, and data unit,Z1,Z2,Z3
//subMenu in every Unit Z1Stack,Z2Stack,Z3Stack
//List Unit is screeen

const ListUnitStack = createStackNavigator({
    ListUnit:ListUnitScreen,
    UnitMenu:UnitMenuNavigator
},{
    initialRouteName:"ListUnit",
    // headerMode: 'none',
    // navigationOptions: {
    //     headerVisible: false,
    // }
  })
export default createStackNavigator({
    ListUnitStack
})


