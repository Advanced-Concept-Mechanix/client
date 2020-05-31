import React, {Component} from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    TextInput,
    Image,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import styles from './style';
import { QRCode } from 'react-native-custom-qr-codes-expo';

export default function createQr(){

    //const[qrText, ]

    return(
        <View style={styles.container}>
            <QRCode 
            content='https://reactnative.com'
            />
        </View>
    );
}