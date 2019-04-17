import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors'
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import AddUserScreen from '../screens/AddUserScreen';
import DbPisaicScreen from '../screens/DbPisaicScreen';
import UnitmenuScreen from '../screens/UnitmenuScreen';
import PisheetScreen from '../screens/pisheet/IndexScreen';
import Workorder from '../screens/pisheet/Workorder';
import Dataunit from '../screens/pisheet/Dataunit';
//Main screen on Home
//with some of nested screen
const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Unitmenu : UnitmenuScreen,
    Pisheetmenu : PisheetScreen,
    Workorder : Workorder,
    Dataunit: Dataunit
  },
  {
    initialRouteName:"Home"
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



//Main screen on DBPisaic
//doesn't have any nested screen
const DatabasePisaicStack = createStackNavigator({
    DbPisaic: DbPisaicScreen
})

DatabasePisaicStack.navigationOptions = {
    drawerLabel: 'Database Pisaic',
    drawerIcon: ({focused}) => (
        <TabBarIcon
        focused={focused}
        name={
            Platform.OS === 'ios'
            ? `ios-cube${focused ? '': '-outline'}`
            : 'md-cube'
        }
        />
    )
};
//Main screen of About
const AboutStack = createStackNavigator({
    About: AboutScreen
})

AboutStack.navigationOptions = {
    drawerLabel: 'About',
    drawerIcon: ({focused}) => (
        <TabBarIcon
        focused= {focused}
        name = {
            Platform.OS === 'ios'
            ? `ios-information-circle${focused ?'' :'-outline'}`
            : 'md-information-circle'
        }
        />
    )
}

//Main screen of AddUser
const AddUserStack = createStackNavigator({
    AddUser: AddUserScreen
})

AddUserStack.navigationOptions = {
    drawerLabel: 'Add User',
    labelStyle:{
      color:Colors.primaryColor
    },
    activeTintColor:Colors.primaryColor,
    drawerIcon:({focused}) => (
        <TabBarIcon
        focused = {focused}
        name = {
            Platform.OS === 'ios'
            ? `ios-person-add${focused ?'':'-outline'}`
            : 'md-person-add'
        }
        />
    )
}

export default createDrawerNavigator({
  HomeStack,
  DatabasePisaicStack,
  AboutStack,
  AddUserStack,
},{
  drawerBackgroundColor:Colors.darkColor,
  contentOptions: {
    activeLabelStyle: {
      fontFamily: 'Roboto',
      color: Colors.primaryColor,
    },
    inactiveLabelStyle:{
      fontFamily: 'Roboto',
      color: Colors.inactive
    },
    activeBackgroundColor:Colors.inactiveBackground
    
  }
},);
