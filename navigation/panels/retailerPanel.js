import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NavigationDrawerStructure from '../../components/drawerImageClass';

import accountStack from '../stacks/accountStack';
import scanStack from '../stacks/scanStack';
import settings from '../stacks/settings';

const RetailerDrawer = createDrawerNavigator();

export default function retailerNav(){
    return(
        <NavigationContainer>
            <RetailerDrawer.Navigator 
            initialRouteName="scan"
            screenOptions={({ navigation }) => ({ 
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            })}
            >
                <RetailerDrawer.Screen 
                name="profile" 
                component={accountStack} 
                options = {({ navigation }) => ({
                    title: 'Profile', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <RetailerDrawer.Screen 
                name="scan" 
                component={scanStack} 
                options = {({ navigation }) => ({
                    title: 'Scan', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
            </RetailerDrawer.Navigator>
        </NavigationContainer>
    );
}