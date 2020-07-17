import React from 'react';
import {
    Image
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../screens/style';

import newQr from '../../screens/newQr';

const createQrTab = createBottomTabNavigator();

export default function createQrScreen(){
    return(
        <createQrTab.Navigator initialRouteName='create'>
            <createQrTab.Screen 
            name='create'
            component={newQr}
            options={{
                tabBarLabel: 'Create',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="drawing" color={color} size={size} />
                ),
            }}
            />
        </createQrTab.Navigator>
    );
}