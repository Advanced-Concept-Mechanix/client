import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';

//import the screens

import account from './screens/account';
import allProducts from './screens/allProducts';
import login from './screens/login';
import newProduct from './screens/newProduct';
import scan from './screens/scan';
import scanningResults from './screens/scanningResults';
import singleProduct from './screens/singleProduct';
import newUser from './screens/newUser';
import updatePassword from './screens/updatePassword';
import updateProduct from './screens/updateProduct';
import updateUser from './screens/updateUser';
import userDetails from './screens/userDetails';
import products from './screens/products';
import newTransaction from './screens/newTransaction';
import blocks from './screens/blocks';
import newBlock from './screens/newBlock';
import allblocks from './screens/allblocks';
import myProducts from './screens/myProducts';
import singleBlock from './screens/singleBlock';

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
        <Drawer.Screen name="MyProducts" component={myProducts} options={{ 
          title: 'My Products'
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
        <Drawer.Screen name="UpdatePassword" component={updatePassword} options={{ 
          title: 'Update Password'
           }} />
        <Drawer.Screen name="UpdateProduct" component={updateProduct} options={{ 
          title: 'Update Product'
           }} />
        <Drawer.Screen name="UpdateUser" component={updateUser} options={{ 
          title: 'Update User'
           }} />
        <Drawer.Screen name="UserDetails" component={userDetails} options={{ 
          title: 'User Details'
           }} />
        <Drawer.Screen name="Products" component={products} options={{ 
          title: 'Products'
           }} />
        <Drawer.Screen name="NewTransaction" component={newTransaction} options={{ 
          title: 'New Transaction'
           }} />
        <Drawer.Screen name="Blocks" component={blocks} options={{ 
          title: 'Blocks'
           }} />
        <Drawer.Screen name="NewBlock" component={newBlock} options={{ 
          title: 'New Block'
           }} />
        <Drawer.Screen name="AllBlocks" component={allblocks} options={{ 
          title: 'All Blocks'
           }} />
        <Drawer.Screen name="SingleBlock" component={singleBlock} options={{ 
          title: 'Single Blocks'
           }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

