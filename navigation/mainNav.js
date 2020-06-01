import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import accountStack from './accountStack';
import productStack from './productStack';
import blockStack from './blockStack';
import qrStack from './qrStack';

const MainNavDrawer = createDrawerNavigator();

export default function mainNav(){
    return(
        <NavigationContainer>
            <MainNavDrawer.Navigator initialRouteName="qr">
                <MainNavDrawer.Screen name="profile" component={accountStack} options={{ title: 'Profile'}}/>
                <MainNavDrawer.Screen name="products" component={productStack} options={{ title: 'Products'}}/>
                <MainNavDrawer.Screen name="blocks" component={blockStack} options={{ title: 'Blocks'}}/>
                <MainNavDrawer.Screen name="qr" component={qrStack} options={{ title: 'QR Codes'}}/>
            </MainNavDrawer.Navigator>
        </NavigationContainer>
    );
}