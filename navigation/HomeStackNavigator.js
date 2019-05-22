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
import z1aScreen from "../screens/submenu/pisheet/Zone1/z1aScreen";
import z1bScreen from "../screens/submenu/pisheet/Zone1/z1bScreen";
import z1cScreen from "../screens/submenu/pisheet/Zone1/z1cScreen";
import z1dScreen from "../screens/submenu/pisheet/Zone1/z1dScreen";
import z1eScreen from "../screens/submenu/pisheet/Zone1/z1eScreen";
import z1fScreen from "../screens/submenu/pisheet/Zone1/z1fScreen";
import z1gScreen from "../screens/submenu/pisheet/Zone1/z1gScreen";
import z2aScreen from "../screens/submenu/pisheet/Zone2/z2aScreen";
import z2bScreen from "../screens/submenu/pisheet/Zone2/z2bScreen";
import z2cScreen from "../screens/submenu/pisheet/Zone2/z2cScreen";
import z2dScreen from "../screens/submenu/pisheet/Zone2/z2dScreen";
import z2eScreen from "../screens/submenu/pisheet/Zone2/z2eScreen";
import z2fScreen from "../screens/submenu/pisheet/Zone2/z2fScreen";
import z2gScreen from "../screens/submenu/pisheet/Zone2/z2gScreen";
import z2hScreen from "../screens/submenu/pisheet/Zone2/z2hScreen";
import z2iScreen from "../screens/submenu/pisheet/Zone2/z2iScreen";
import z3aScreen from "../screens/submenu/pisheet/Zone3/z3aScreen";
import z3bScreen from "../screens/submenu/pisheet/Zone3/z3bScreen";
import z3cScreen from "../screens/submenu/pisheet/Zone3/z3cScreen";
import z3dScreen from "../screens/submenu/pisheet/Zone3/z3dScreen";
import z3eScreen from "../screens/submenu/pisheet/Zone3/z3eScreen";
import z3fScreen from "../screens/submenu/pisheet/Zone3/z3fScreen";
import z3gScreen from "../screens/submenu/pisheet/Zone3/z3gScreen";
import ImagePickerScreen from "../screens/submenu/pisheet/ImagePickerScreen";

//Main screen on Home
//with some of nested screen
//@TODO:cek status 
//@TODO:goto pi screen
//@TODO:Create new pi
//@TODO:Give order
const HomeStack = createStackNavigator({
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

    //ImagePicker
    ImagePicker:ImagePickerScreen,

    Zone1:IndexZone1Screen,
          //sub Zone1
    z1a:z1aScreen,
    z1b:z1bScreen,
    z1c:z1cScreen,
    z1d:z1dScreen,
    z1e:z1eScreen,
    z1f:z1fScreen,
    z1g:z1gScreen,

    Zone2:IndexZone2Screen,
      //sub Zone2
    z2a:z2aScreen,
    z2b:z2bScreen,
    z2c:z2cScreen,
    z2d:z2dScreen,
    z2e:z2eScreen,
    z2f:z2fScreen,
    z2g:z2gScreen,
    z2h:z2hScreen,
    z2i:z2iScreen,


    Zone3:IndexZone3Screen,
      //sub Zone3
      z3a:z3aScreen,
      z3b:z3bScreen,
      z3c:z3cScreen,
      z3d:z3dScreen,
      z3e:z3eScreen,
      z3f:z3fScreen,
      z3g:z3gScreen,

    //Problem Log
    ProblemLogScreen:ProblemLogScreen,
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

export default HomeStack;
