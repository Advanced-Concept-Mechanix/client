import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import newQr from '../screens/newQr';
import newTransaction from '../screens/newTransaction';
import scan from '../screens/scan';

const createQrStack = createStackNavigator();

function createQrStackScreen(){
    return(
        <createQrStack.Navigator initialRouteName="newQr">
            <createQrStack.Screen name="newQr" component={newQr} options={{ title: 'Create'}}/>
        </createQrStack.Navigator>
    );
}

const scanStack = createStackNavigator();

function scanStackScreen(){
    return(
        <scanStack.Navigator initialRouteName="Scan">
            <scanStack.Screen name="scan" component={scan} options={{ title: 'Scan'}}/>
            <scanStack.Screen name="newTransaction" component={newTransaction} options={{ title: 'Create Transaction'}}/>
        </scanStack.Navigator>
    );
}

const qrTab = createBottomTabNavigator();

export default function qrNav(){
    return(
        <qrTab.Navigator initialRouteName="scanTab">
            <qrTab.Screen 
            name="createQrTab" 
            component={createQrStackScreen} 
            options={{
                tabBarLabel: 'Create',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="drawing" color={color} size={size} />
                ),
            }}
            />
            <qrTab.Screen 
            name="scanTab" 
            component={scanStackScreen} 
            options={{
                tabBarLabel: 'Scan',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
                ),
            }}
            />
        </qrTab.Navigator>
    );
}