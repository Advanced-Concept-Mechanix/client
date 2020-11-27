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
import productStack from '../stacks/productStack';
import qrStack from '../stacks/qrStack';
import scanStack from '../stacks/scanStack';
import settings from '../stacks/settings';

const ManufacturerDrawer = createDrawerNavigator();

export default function manufacturerNav(){
    return(
        <NavigationContainer>
            <ManufacturerDrawer.Navigator 
            initialRouteName="scan"
            screenOptions={({ navigation }) => ({ 
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            })}
            >
                <ManufacturerDrawer.Screen 
                name="profile" 
                component={accountStack} 
                options = {({ navigation }) => ({
                    title: 'Profile', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <ManufacturerDrawer.Screen 
                name="products" 
                component={productStack} 
                options = {({ navigation }) => ({
                    title: 'Products', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <ManufacturerDrawer.Screen 
                name="qr" 
                component={qrStack} 
                options = {({ navigation }) => ({
                    title: 'QR Codes', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <ManufacturerDrawer.Screen 
                name="scan" 
                component={scanStack} 
                options = {({ navigation }) => ({
                    title: 'Scan', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
            </ManufacturerDrawer.Navigator>
        </NavigationContainer>
    );
}