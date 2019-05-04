import React from 'react';
import { Platform,ScrollView,AsyncStorage } from 'react-native';
import { DrawerItems, SafeAreaView, createStackNavigator, createDrawerNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors'
import AboutScreen from '../screens/AboutScreen';
import AddUserScreen from '../screens/AddUserScreen';
import DbPisaicScreen from '../screens/DbPisaicScreen';
import HomeStack from '../navigation/HomeStackNavigator'
//Main screen on Home
//with some of nested screen
//@TODO:cek status 
//@TODO:goto pi screen
//@TODO:Create new pi
//@TODO:Give order

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

const LogoutStack = createStackNavigator({
  Logout:LogoutMenu
})

class LogoutMenu {
  constructor(){
    super()
  }
  __Logout = async () =>{
    console.log(AsyncStorage)
  }
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

//Add custom drawer, override default drawer config
const drawerContent = (props) =>
  (
    <ScrollView>
      <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
        <DrawerItems {...props} onItemPress={ ({route, focused}) => {
          console.log(route)
          if (route.key === "HomeStack") {
            if (route.routes.length === 1) {
              props.navigation.navigate(route.routeName);
            } else {
              props.navigation.navigate(route.routes[0].routeName);
            }
          } else {
            props.onItemPress({route, focused});
          }
        }} />
        <Button title="Logout" onPress={DO_SOMETHING_HERE}/>
      </SafeAreaView>
      
    </ScrollView>
  )
export default createDrawerNavigator({
  HomeStack,
  DatabasePisaicStack,
  AboutStack,
  AddUserStack,
},{
  drawerBackgroundColor:Colors.darkColor,
  contentComponent:drawerContent,
  contentOptions: {
    activeLabelStyle: {
      fontFamily: 'Roboto',
      color: Colors.primaryColor,
    },
    inactiveLabelStyle:{
      fontFamily: 'Roboto',
      color: Colors.inactive
    },
    activeBackgroundColor:Colors.inactiveBackground,
  }
},);
