import React, {Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import styles from './style';

export default function scan({ navigation }){
    return(
        <View style={styles.container}>
            <Text>scanning page</Text>
            <Button onPress={() => navigation.navigate('ScanningResults')} title="Go to Scanning Results" />
            <Button onPress={() => navigation.goBack()} title="Go back to Login" />
        </View>
    );
}