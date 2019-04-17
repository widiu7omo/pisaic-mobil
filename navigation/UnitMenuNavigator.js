import UnitMenuNavigator from './UnitMenuNavigator'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import IndexSubmenuScreen from '../screens/submenu/IndexSubmenuScreen';
import ProblemLogScreen from '../screens/submenu/ProblemLogScreen'
import InspectCameraScreen from '../screens/submenu/InspectCameraScreen'
import BacklogEntrySheetScreen from '../screens/submenu/BacklogEntrySheetScreen'
//Show Units menu
//Menu in every Unit Workorder, and data unit,Z1,Z2,Z3
//subMenu in every Unit Z1Stack,Z2Stack,Z3Stack
//List Unit is screeen

const UnitMenuStack = createStackNavigator({
    IndexUnitMenu:IndexSubmenuScreen,
    //Pisheet : indexnavigator
    //BacklogMonitor:indexnavigator
    //cylinder daily:indexnavigator
    ProblemLog:ProblemLogScreen,
    InspectCamera:InspectCameraScreen,
    BacklogEntry:BacklogEntrySheetScreen,

},{
    initialRouteName:"IndexUnitMenu",
    // headerMode: 'none',
    // navigationOptions: {
    //     headerVisible: false,
    // }
  })
export default createStackNavigator({
    UnitMenuStack
})


