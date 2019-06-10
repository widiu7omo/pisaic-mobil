import React from 'react';
import {Alert, AsyncStorage, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator, createStackNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors'
import AboutScreen from '../screens/AboutScreen';
import UserScreen from '../screens/UserScreen';
import AddUserScreen from '../screens/AddUserScreen';
import DbPisaicScreen from '../screens/DbPisaicScreen';
import HomeStack from './HomeStackNavigator';
import indexScreen from "../screens/settings/indexScreen";
import PisheetDbScreen from "../screens/dbpisaic/PisheetDbScreen";
//Main screen on Home
//with some of nested screen
//@TODO:cek status 
//@TODO:goto pi screen
//@TODO:Create new pi
//@TODO:Give order
class NullStack extends React.Component {
    static navigationOptions = {
        drawerLabel: () => null
    }
}

//Main screen on DBPisaic
//doesn't have any nested screen
const DatabasePisaicStack = createStackNavigator({
    DbPisaic: DbPisaicScreen,
    PisheetDb: PisheetDbScreen
});

DatabasePisaicStack.navigationOptions = {
    drawerLabel: 'Database Pisaic',
    drawerIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-cube${focused ? '' : '-outline'}`
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
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    )
};
//Main screen of Setting
const SettingStack = createStackNavigator({
    Settings: indexScreen
});

SettingStack.navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-setting`
                    : 'md-settings'
            }/>
    )
};

//Main screen of AddUser
const UserStack = createStackNavigator({
    User: UserScreen,
    AddUser: AddUserScreen,
});

UserStack.navigationOptions = {
    drawerLabel: 'Add User',
    labelStyle: {
        color: Colors.primaryColor
    },
    activeTintColor: Colors.primaryColor,
    drawerIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-person-add${focused ? '' : '-outline'}`
                    : 'md-person-add'
            }
        />
    )
};
let routeStack = {
    HomeStack,
    DatabasePisaicStack,
    AboutStack,
    SettingStack,
    UserStack,
};

//Add custom drawer, override default drawer config
const drawerContent = (props) => {
    AsyncStorage.getItem('level').then(res => {
        props.screenProps.level = res;
    });
    const level = props.screenProps.level;
    const newProps = {...props};
    if (level !== 'admin') {
        newProps.items = newProps.items.filter(item => {
            return (item.key !== 'SettingStack' && item.key !== 'UserStack') ? item : null;
        });
    }


    return (<ScrollView>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerItems {...newProps} onItemPress={({route, focused}) => {
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
            }}/>
            <TouchableOpacity onPress={() =>
                Alert.alert(
                    'Log out',
                    'Do you want to logout?',
                    [
                        {
                            text: 'Cancel', onPress: () => {
                                return null
                            }
                        },
                        {
                            text: 'Confirm', onPress: () => {
                                AsyncStorage.removeItem('userToken');
                                //enable for debugging,
                                AsyncStorage.removeItem('isUsed');
                                props.navigation.navigate('Auth')
                            }
                        },
                    ],
                    {cancelable: false}
                )
            }>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: 10}}>
                    <TabBarIcon name={
                        Platform.OS === 'ios'
                            ? `ios-log-out'}`
                            : 'md-log-out'
                    }
                                focused={false}
                    />
                    <Text style={{marginTop: 5, marginLeft: 30, fontWeight: 'bold', color: '#fff'}}>Logout</Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>

    </ScrollView>)
};

export default createDrawerNavigator(routeStack, {
    drawerBackgroundColor: Colors.darkColor,
    contentComponent: drawerContent,
    contentOptions: {
        activeLabelStyle: {
            fontFamily: 'Roboto',
            color: Colors.primaryColor,
        },
        inactiveLabelStyle: {
            fontFamily: 'Roboto',
            color: Colors.inactive
        },
        activeBackgroundColor: Colors.inactiveBackground,
    }
},);
