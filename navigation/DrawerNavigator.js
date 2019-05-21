import React from 'react';
import { Platform,ScrollView,View,AsyncStorage,TouchableOpacity,Text,Alert } from 'react-native';
import { DrawerItems, SafeAreaView, createStackNavigator, createDrawerNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors'
import AboutScreen from '../screens/AboutScreen';
import UserScreen from '../screens/UserScreen';
import AddUserScreen from '../screens/AddUserScreen';
import DbPisaicScreen from '../screens/DbPisaicScreen';
import HomeStack from './HomeStackNavigator';
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
});

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
});

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
};

//Main screen of AddUser
const UserStack = createStackNavigator({
    User: UserScreen,
    AddUser:AddUserScreen,
});

UserStack.navigationOptions = {
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
};

//Add custom drawer, override default drawer config
const drawerContent = (props) =>
  (
    <ScrollView>
      <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
        <DrawerItems {...props} onItemPress={ ({route, focused}) => {
          // console.log(route);
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
        <TouchableOpacity onPress={()=>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    AsyncStorage.removeItem('userToken');
                    props.navigation.navigate('Auth')
                  }},
                ],
                { cancelable: false }
              )  
            }>
            <View style={{flexDirection:'row',justifyContent:'flex-start',marginLeft:20,marginTop:10}}>
            <TabBarIcon name = {
                  Platform.OS === 'ios'
                  ? `ios-log-out'}`
                  : 'md-log-out'
              }
              focused = {false}
              />
              <Text style={{marginTop:5,marginLeft:30,fontWeight: 'bold',color: '#fff'}}>Logout</Text>
            </View>
            </TouchableOpacity>
      </SafeAreaView>
      
    </ScrollView>
  );
export default createDrawerNavigator({
  HomeStack,
  DatabasePisaicStack,
  AboutStack,
  UserStack,
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
