import React, {Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import styles from './style';

export default function newProduct(){
    return(
        <View style={styles.container}>
            <Text>New product page</Text>
        </View>
    );
}