import React from 'react';
import {
    Image
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../screens/style';


import productDetails from '../../screens/productDetails';
import scan from '../../screens/scan';
import authentic from '../../screens/authenticate';;
import productJourney from '../../screens/productJourney';
import cdp from '../../screens/cdp';
import canvas from '../../screens/canvas';

const scanningTab = createBottomTabNavigator();

function scanningNav(){

    // const{data} = route.params;
    // const{user_id} = route.params;
    // const{loc} = route.params;
    // const{time} = route.params;
    return(
        <scanningTab.Navigator initialRouteName="authenticate">
            <scanningTab.Screen 
            name="authenticate"
            component={authentic}
            options={{
                tabBarLabel: 'Check',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="shield-check" color={color} size={size} />
                ),
            }}
            />
            <scanningTab.Screen 
            name="productDetails"
            component={productDetails}
            options={{
                tabBarLabel: 'Details',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="details" color={color} size={size} />
                ),
            }}
            />
            <scanningTab.Screen 
            name="productJourney"
            component={productJourney}
            options={{
                tabBarLabel: 'Journey',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="shield-airplane" color={color} size={size} />
                ),
            }}
            />
        </scanningTab.Navigator>
    );
}

const scanStack = createStackNavigator();

function scanStackScreen(){
    return(
        <scanStack.Navigator>
            <scanStack.Screen 
            name='scan'
            component={scan}
            options={{ title: 'Scan'}}
            />
            <scanStack.Screen 
            name='scanningNav'
            component={scanningNav}
            options={{ title: 'Results'}}
            />
        </scanStack.Navigator>
    );
}

const scanTab = createBottomTabNavigator();

export default function scanNav(){
    return(
        <scanTab.Navigator initialRouteName="scanStackScreen">
            <scanTab.Screen 
            name='scanStackScreen'
            component={scanStackScreen}
            options={{
                tabBarLabel: 'Scan',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
                ),
            }}
            />
            <scanTab.Screen 
            name='canvas'
            component={canvas}
            options={{
                tabBarLabel: 'CDP',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="bug-check" color={color} size={size} />
                ),
            }}
            />
        </scanTab.Navigator>
    );
}