import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import account from './screens/account';
import allProducts from './screens/allProducts';
import login from './screens/login';
import newProduct from './screens/newProduct';
import scan from './screens/scan';
import scanningResults from './screens/scanningResults';
import singleProduct from './screens/singleProduct';
import newUser from './screens/newUser';

const Drawer = createDrawerNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={login} options={{ 
          title: 'Login'
          // headerLeft: () => {
          //   <TouchableOpacity onPress={() => DrawerActions.toggleDrawer()}>
          //     <Image
          //   source={require('./assets/drawer.png')}
          //   style={{ width: 25, height: 25, marginLeft: 5 }}
          //     />
          //   </TouchableOpacity>
          // }
          }} />
        <Drawer.Screen name="NewUser" component={newUser} options={{ 
          title: 'Create User'
           }} />
        <Drawer.Screen name="Scan" component={scan} options={{ 
          title: 'Scan'
           }} />
        <Drawer.Screen name="Account" component={account} options={{ 
          title: 'Account'
           }} />
        <Drawer.Screen name="AllProducts" component={allProducts} options={{ 
          title: 'All Products'
           }} />
        <Drawer.Screen name="NewProduct" component={newProduct} options={{ 
          title: 'New Product'
           }} />
        <Drawer.Screen name="ScanningResults" component={scanningResults} options={{ 
          title: 'Results'
           }} />
        <Drawer.Screen name="SingleProduct" component={singleProduct} options={{ 
          title: 'Single Product'
           }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

