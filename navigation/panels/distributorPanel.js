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

const DistributorDrawer = createDrawerNavigator();

export default function distributorNav(){
    return(
        <NavigationContainer>
            <DistributorDrawer.Navigator 
            initialRouteName="scan"
            screenOptions={({ navigation }) => ({ 
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            })}
            >
                <DistributorDrawer.Screen 
                name="profile" 
                component={accountStack} 
                options = {({ navigation }) => ({
                    title: 'Profile', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <DistributorDrawer.Screen 
                name="scan" 
                component={scanStack} 
                options = {({ navigation }) => ({
                    title: 'Scan', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
            </DistributorDrawer.Navigator>
        </NavigationContainer>
    );
}