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

const GeneralDrawer = createDrawerNavigator();

export default function generalNav(){
    return(
        <NavigationContainer>
            <GeneralDrawer.Navigator 
            initialRouteName="scan"
            screenOptions={({ navigation }) => ({ 
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            })}
            >
                <GeneralDrawer.Screen 
                name="profile" 
                component={accountStack} 
                options = {({ navigation }) => ({
                    title: 'Profile', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
            </GeneralDrawer.Navigator>
        </NavigationContainer>
    );
}