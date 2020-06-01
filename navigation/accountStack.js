import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import newUser from '../screens/newUser';
import userDetails from '../screens/userDetails';
import updateUser from '../screens/updateUser';
import login from '../screens/login';
import updatePassword from '../screens/updatePassword';

const loginStack = createStackNavigator();

function loginStackScreen(){
    return(
        <loginStack.Navigator initialRouteName="login">
            <settingStack.Screen name="login" component={login} options={{ title: 'Login'}}/>
            <loginStack.Screen name="newUser" component={newUser} options={{ title: 'Create User'}}/>
            <loginStack.Screen name="updatePassword" component={updatePassword} options={{ title: 'Update Password'}}/>
        </loginStack.Navigator>
    );
}

const settingStack = createStackNavigator();

function settingStackScreen(){
    return(
        <settingStack.Navigator initialRouteName="userDetails">
            <settingStack.Screen name="userDetails" component={userDetails} options={{ title: 'View Details'}}/>
            <settingStack.Screen name="updateUser" component={updateUser} options={{ title: 'Edit User'}}/>
        </settingStack.Navigator>
    );
}

const accountTab = createBottomTabNavigator();

export default function accountNav(){
    return(
        <accountTab.Navigator initialRouteName="settingsTab">
            <accountTab.Screen name="loginTab" component={loginStackScreen} options={{ title: 'Login'}}/>
            <accountTab.Screen name="settingsTab" component={settingStackScreen} options={{ title: 'Settings'}}/>
        </accountTab.Navigator>
    );
}