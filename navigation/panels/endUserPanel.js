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

const EndUserDrawer = createDrawerNavigator();

export default function EndUserNav(){
    return(
        <NavigationContainer>
            <EndUserDrawer.Navigator 
            initialRouteName="scan"
            screenOptions={({ navigation }) => ({ 
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            })}
            >
                <EndUserDrawer.Screen 
                name="profile" 
                component={accountStack} 
                options = {({ navigation }) => ({
                    title: 'Profile', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <EndUserDrawer.Screen 
                name="scan" 
                component={scanStack} 
                options = {({ navigation }) => ({
                    title: 'Scan', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
            </EndUserDrawer.Navigator>
        </NavigationContainer>
    );
}