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
import blockStack from '../stacks/blockStack';
import qrStack from '../stacks/qrStack';
import scanStack from '../stacks/scanStack';
import settings from '../stacks/settings';

const AdminDrawer = createDrawerNavigator();

export default function adminNav(){
    return(
        <NavigationContainer>
            <AdminDrawer.Navigator 
            initialRouteName="scan"
            screenOptions={({ navigation }) => ({ 
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            })}
            >
                <AdminDrawer.Screen 
                name="profile" 
                component={accountStack} 
                options = {({ navigation }) => ({
                    title: 'Profile', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <AdminDrawer.Screen 
                name="products" 
                component={productStack} 
                options = {({ navigation }) => ({
                    title: 'Products', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <AdminDrawer.Screen 
                name="blocks" 
                component={blockStack} 
                options = {({ navigation }) => ({
                    title: 'Blocks', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <AdminDrawer.Screen 
                name="qr" 
                component={qrStack} 
                options = {({ navigation }) => ({
                    title: 'QR Codes', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
                <AdminDrawer.Screen 
                name="scan" 
                component={scanStack} 
                options = {({ navigation }) => ({
                    title: 'Scan', 
                    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
                })}
                />
            </AdminDrawer.Navigator>
        </NavigationContainer>
    );
}