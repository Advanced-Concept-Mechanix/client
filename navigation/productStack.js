import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import newProduct from '../screens/newProduct';
import allProducts from '../screens/allProducts';
import myProducts from '../screens/myProducts';
import singleProduct from '../screens/singleProduct';
import updateProduct from '../screens/updateProduct';

const myProductStack = createStackNavigator();

function myProductStackScreen(){
    return(
        <myProductStack.Navigator initialRouteName="myProducts">
            <myProductStack.Screen name="myProducts" component={myProducts} options={{ title: 'My Products'}}/>
            <myProductStack.Screen name="allProducts" component={allProducts} options={{ title: 'All Products'}}/>
            <myProductStack.Screen 
            name="singleProduct" 
            component={singleProduct} 
            options={({ route }) => ({ title: route.params.item.name })}
            />
            <myProductStack.Screen name="updateProduct" component={updateProduct} options={{ title: 'Update Product'}}/>
            {/* <myProductStack.Screen name="deleteProduct" component={deleteProduct} options={{ title: 'Delete Product'}}/> */}
        </myProductStack.Navigator>
    );
}

const createProductStack = createStackNavigator();

function createProductStackScreen(){
    return(
        <createProductStack.Navigator initialRouteName="newProduct">
            <createProductStack.Screen name="newProduct" component={newProduct} options={{ title: 'Create Profile'}}/>
            <createProductStack.Screen name="singleProduct" component={singleProduct} options={{ title: 'Single Product'}}/>
        </createProductStack.Navigator>
    );
}

const productTab = createBottomTabNavigator();

export default function productNav(){
    return(
        <productTab.Navigator initialRouteName="myProductTab">
            <productTab.Screen 
            name="myProductTab" 
            component={myProductStackScreen} 
            options={{
                tabBarLabel: 'List',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="view-list" color={color} size={size} />
                ),
            }}
            />
            <productTab.Screen 
            name="createProductTab" 
            component={createProductStackScreen} 
            options={{
                tabBarLabel: 'Create',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="drawing" color={color} size={size} />
                ),
            }}
            />
        </productTab.Navigator>
    );
}