import React, {Component, useState, useEffect} from 'react';
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
import Mytextinput from '../components/mytextinput';
import Mybutton from '../components/mybutton';

export default function createQr(){

    const[qrText, setQrText] = useState('change me');
    const[qrTextHolder, setQrTextHolder] = useState('');

    // useEffect(() => {

    //     function generateQr(){
    //         return(
    //             <QRCode 
    //             content={qrText}
    //             logo={require('../assets/logo.png')}
    //             />
    //         );
    //     }

    //     generateQr()
    // },[qrText]);

    const handleChange = () => {
        setQrText(qrTextHolder);
    }

    return(
        <View style={styles.container}>
            <QRCode 
                content={qrText}
                logo={require('../assets/logo.png')}
                ecl='H'
            />
            <Mytextinput
            value={qrTextHolder}
            placeholder={'Enter text for Qr code'}
            //onChangeText={(qrText) => setQrText(qrText)}
            onChangeText={(qrTextHolder) => setQrTextHolder(qrTextHolder)}
            />
            <Mybutton
            title='Create'
            customClick={handleChange}
            />
        </View>
    );
}