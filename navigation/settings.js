import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import userDetails from '../screens/userDetails';
import updateUser from '../screens/updateUser';
import styles from '../screens/style';

const settingsTab = createBottomTabNavigator();

export default function settingTabScreen(){
    return(
        <settingsTab.Navigator 
        initialRouteName="userDetails"
        screenOptions={{
            headerTitleStyle: styles.title
        }}
        >
            <settingsTab.Screen name="userDetails" component={userDetails} options={{ title: 'View Details'}}/>
            <settingsTab.Screen name="updateUser" component={updateUser} options={{ title: 'Edit User'}}/>
        </settingsTab.Navigator>
    );
}