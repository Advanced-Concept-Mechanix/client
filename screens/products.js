import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './style';
import Mybutton from '../components/mybutton';

export default function account({navigation}){

    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Mybutton
                    title='My Products'
                    customClick={() => navigation.navigate('AllProducts')}
                    />
                    <Mybutton
                    title='New Product'
                    customClick={() => navigation.navigate('NewProduct')}
                    />
                </View>
            </TouchableOpacity> 
        </View>
    )
}