import React, { useState, useEffect} from 'react';
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
//import { QRCode } from 'react-native-custom-qr-codes-expo';
import QRCode from 'react-native-qrcode-svg';
import * as Print from 'expo-print';
import Mytextinput from '../components/mytextinput';
import Mybutton from '../components/mybutton';

export default function createQr(){

    const[qrText, setQrText] = useState('change me');
    const[qrTextHolder, setQrTextHolder] = useState('');
    const[qrData, setQrData] = useState('');

    useEffect(() => {

        getDataURL();

    }, [getDataURL]);

    // const print = () => {
    //     Print.printAsync({
    //       html: `
    //          <img src="data:image/jpeg;base64,${qrData}"/>
    //        `
    //     });
    // }

    const getDataURL = () => {

        svg.toDataURL(callback);

    }


    const callback = (dataURL) => {

        console.log(dataURL);
        setQrData(dataURL);

    }

    const handleChange = () => {

        setQrText(qrTextHolder);

    }

    return(
        <View style={styles.container}>
            <QRCode 
                value={qrText}
                //logo={require('../assets/logo.png')}
                ecl='H'
                getRef={(c) => svg = c}
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
            {/* <Mybutton
            title='Print'
            customClick={print}
            /> */}
        </View>
    );
}