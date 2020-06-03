import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerImage from '../components/drawerImage';
import NavigationDrawerStructure from '../components/drawerImageClass';

import accountStack from './accountStack';
import productStack from './productStack';
import blockStack from './blockStack';
import qrStack from './qrStack';

  

const MainNavDrawer = createDrawerNavigator();

export default function mainNav(){
    return(
        <NavigationContainer>
            <MainNavDrawer.Navigator 
            initialRouteName="qr"
            screenOptions={({ navigation }) => ({ 
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            })}
            >
                <MainNavDrawer.Screen 
                name="profile" 
                component={accountStack} 
                options = {({ navigation }) => ({
                    title: 'Profile', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <MainNavDrawer.Screen 
                name="products" 
                component={productStack} 
                options = {({ navigation }) => ({
                    title: 'Products', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <MainNavDrawer.Screen 
                name="blocks" 
                component={blockStack} 
                options = {({ navigation }) => ({
                    title: 'Blocks', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <MainNavDrawer.Screen 
                name="qr" 
                component={qrStack} 
                options = {({ navigation }) => ({
                    title: 'QR Codes', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
            </MainNavDrawer.Navigator>
        </NavigationContainer>
    );
}