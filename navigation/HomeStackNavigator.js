import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors'
import HomeScreen from '../screens/HomeScreen';
import WorkorderScreen from '../screens/submenu/pisheet/WorkorderScreen';
import ListUnitScreen from '../screens/ListUnitScreen';
import IndexSubmenuScreen from '../screens/submenu/IndexSubmenuScreen';
import IndexPiSheetScreen from '../screens/submenu/pisheet/IndexPiSheetScreen';
import InspectCameraScreen from '../screens/submenu/InspectCameraScreen'
import ProblemLogScreen from '../screens/submenu/ProblemLogScreen'
import BacklogEntrySheetScreen from '../screens/submenu/BacklogEntrySheetScreen'
import IndexBacklogMonitorScreen from '../screens/submenu/backlogmonitor/IndexBacklogMonitorScreen'
import IndexCylinderScreen from '../screens/submenu/cylinderdailycheck/IndexCylinderScreen'
import DataunitScreen from "../screens/submenu/pisheet/DataunitScreen";
import IndexZone1Screen from "../screens/submenu/pisheet/Zone1/IndexZone1Screen";
import IndexZone2Screen from "../screens/submenu/pisheet/Zone2/IndexZone2Screen";
import IndexZone3Screen from "../screens/submenu/pisheet/Zone3/IndexZone3Screen";
import DetailBacklogScreen from "../screens/submenu/backlogmonitor/DetailBacklogScreen";
import DataUnitDailyScreen from "../screens/submenu/cylinderdailycheck/DataUnitDailyScreen";
import FotoSheetDailyScreen from "../screens/submenu/cylinderdailycheck/FotoSheetDailyScreen";
import SheetDailyQuestionScreen from "../screens/submenu/cylinderdailycheck/SheetDailyQuestionScreen";
import SheetDailyScreen from "../screens/submenu/cylinderdailycheck/SheetDailyScreen";
import BucketGroupScreen from "../screens/submenu/pisheet/Zone1/BucketGroupScreen";
import z1bScreen from "../screens/submenu/pisheet/Zone1/z1bScreen";
import z1cScreen from "../screens/submenu/pisheet/Zone1/z1cScreen";
import z1dScreen from "../screens/submenu/pisheet/Zone1/z1dScreen";
import z1eScreen from "../screens/submenu/pisheet/Zone1/z1eScreen";
import z1fScreen from "../screens/submenu/pisheet/Zone1/z1fScreen";
import z1gScreen from "../screens/submenu/pisheet/Zone1/z1gScreen"
//Main screen on Home
//with some of nested screen
//@TODO:cek status 
//@TODO:goto pi screen
//@TODO:Create new pi
//@TODO:Give order
export default HomeStack = createStackNavigator({ 
    //Main Navigation
    Home: HomeScreen,
    //list Units 
    ListUnit:ListUnitScreen,
    //Menu in every Unit
    UnitMenu: IndexSubmenuScreen,
    //Periodic Inspection: Have Submenu
    PeriodicInspection:IndexPiSheetScreen,
        //sub Pi
    Dataunit:DataunitScreen,
    Workorder:WorkorderScreen,
    Zone1:IndexZone1Screen,
          //sub Zone1
    BucketGroup:BucketGroupScreen,
    z1b:z1bScreen,
    z1c:z1cScreen,
    z1d:z1dScreen,
    z1e:z1eScreen,
    z1f:z1fScreen,
    z1g:z1gScreen,


    Zone2:IndexZone2Screen,
    Zone3:IndexZone3Screen,
    //Problem Log
    ProblemLog:ProblemLogScreen,
    //Inspect Camera
    InspectCamera:InspectCameraScreen,
    //Backlog entry sheet
    BacklogEntry:BacklogEntrySheetScreen,
    //Backlog Monitor: Have Submenu
    BacklogMonitor:IndexBacklogMonitorScreen,
        //sub Backlog monitor
    DetailBacklog:DetailBacklogScreen,
    //Cylinder Daily
    CylinderDaily:IndexCylinderScreen,
        //sub Cylinder daily
    DataunitDaily:DataUnitDailyScreen,
    SheetDaily:SheetDailyScreen,
    FotoSheetDaily:FotoSheetDailyScreen,
    SheetDailyQuestion:SheetDailyQuestionScreen

  },
  {
    initialRouteName:"Home",
  }
);

HomeStack.navigationOptions = {
  drawerLabel: 'Home',
  activeTintColor: Colors.primaryColor,
  drawerIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};
