import React from 'react';
import {
    Image
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../screens/style';

import newQr from '../screens/newQr';
import newTransaction from '../screens/newTransaction';
import productDetails from '../screens/productDetails';
import scan from '../screens/scan';
import myProductsCreate from '../screens/myProductsCreate';
import authentic from '../screens/authenticate';
import singleProduct from '../screens/singleProduct';
import productJourney from '../screens/productJourney';

function LogoTitle() {
    return (
      <Image
        style={styles.logoTitle}
        source={require('../assets/logo.png')}
      />
    );
}

const createQrStack = createStackNavigator();

function createQrStackScreen(){
    return(
        <createQrStack.Navigator 
        initialRouteName="newQr"
        screenOptions={{
            headerTitleStyle: styles.title,
            // headerTitle: props => <LogoTitle {...props} />
        }}
        >
            {/* <createQrStack.Screen name="myProductsCreate" component={myProductsCreate} options={{ title: 'Product Profiles'}}/> */}
            <createQrStack.Screen name="newQr" component={newQr} options={{ title: 'Create'}}/>
        </createQrStack.Navigator>
    );
}

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
        <scanStack.Navigator 
        initialRouteName="Scan"
        screenOptions={{
            headerTitleStyle: styles.title
        }}
        >
            <scanStack.Screen name="scan" component={scan} options={{ title: 'Scan'}}/>
            <scanStack.Screen name="scanningNav" component={scanningNav} options={{ title: 'Scanning Results'}}/>
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