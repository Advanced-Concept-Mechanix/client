import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../screens/style';

import newUser from '../screens/newUser';
import userDetails from '../screens/userDetails';
import updateUser from '../screens/updateUser';
import login from '../screens/login';
import updatePassword from '../screens/updatePassword';

const loginStack = createStackNavigator();

function loginStackScreen(){
    return(
        <loginStack.Navigator 
        initialRouteName="login"
        screenOptions={{
            headerTitleStyle: styles.title
        }}
        >
            <loginStack.Screen name="login" component={login} options={{ title: 'Login'}}/>
            <loginStack.Screen name="newUser" component={newUser} options={{ title: 'Create User'}}/>
            <loginStack.Screen name="updatePassword" component={updatePassword} options={{ title: 'Update Password'}}/>
        </loginStack.Navigator>
    );
}

const settingStack = createStackNavigator();

function settingStackScreen(){
    return(
        <settingStack.Navigator 
        initialRouteName="userDetails"
        screenOptions={{
            headerTitleStyle: styles.title
        }}
        >
            <settingStack.Screen name="userDetails" component={userDetails} options={{ title: 'View Details'}}/>
            <settingStack.Screen name="updateUser" component={updateUser} options={{ title: 'Edit User'}}/>
        </settingStack.Navigator>
    );
}

const accountTab = createBottomTabNavigator();

export default function accountNav(){
    return(
        <accountTab.Navigator initialRouteName="loginTab">
            <accountTab.Screen 
            name="loginTab" 
            component={loginStackScreen} 
            options={{
                tabBarLabel: 'Login',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="login" color={color} size={size} />
                ),
            }}
            />
            <accountTab.Screen 
            name="settingsTab" 
            component={settingStackScreen} 
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-settings" color={color} size={size} />
                ),
            }}
            />
        </accountTab.Navigator>
    );
}