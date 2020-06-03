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
//import generateQrData from '../functions/generateQrData';
import QrData from '../functions/generateQrData';
import hash from '../functions/hash';

function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}

export default function createQr({ route }){

    const{item} = route.params;
    console.log(item);
    const[qrText, setQrText] = useState('change me');
    const[qrTextHolder, setQrTextHolder] = useState('');
    const[qrNum, setQrNum] = useState(0);
    // const[qrData, setQrData] = useState([]);
    const qrDataSet = [];

    const getQrData = async() => {
        if(qrNum === 0){
            alert('Please set a number!');
        }
        for(i = 1; i <= qrNum; i++){
            //let _qrdata = new QrData(item);
            let randomNumString = Math.floor((Math.random()*1000) + 1).toString();
            let _qrdata = {
                profileId:item._id,
                name:item.name,
                description:item.description,
                manufacturer:item.manufacturer,
                dateOfManufacture:new Date(),
                dateOfExpiry: addDays(item.daysBeforeExpiry),
                UUID:await hash(item._id + item.manufacturer + new Date() + randomNumString)
            }

            // _qrdata.dateOfExpiry = new Date() + item.daysBeforeExpiry;
            // _qrdata.UUID = await hash(item._id + item.manufacturer + new Date() + randomNumString);
            qrDataSet.push(_qrdata);
        }
        console.log(qrDataSet);
    }

    // useEffect(() => {

    //     getDataURL();

    // }, [getDataURL]);

    // // const print = () => {
    // //     Print.printAsync({
    // //       html: `
    // //          <img src="data:image/jpeg;base64,${qrData}"/>
    // //        `
    // //     });
    // // }

    // const getDataURL = () => {

    //     svg.toDataURL(callback);

    // }


    // const callback = (dataURL) => {

    //     console.log(dataURL);
    //     setQrData(dataURL);

    // }

    const handleChange = () => {

        setQrText(qrTextHolder);

    }

    return(
        <View style={styles.container}>
            <QRCode 
                value={qrText}
                logo={require('../assets/logo.png')}
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
            <Mytextinput
            placeholder={'Enter number of qr codes'}
            keyboardType="numeric"
            onChangeText={(qrNum) => setQrNum(qrNum)}
            />
            <Mybutton
            title='Generate Data'
            customClick={getQrData}
            />
            {/* <Mybutton
            title='Print'
            customClick={print}
            /> */}
        </View>
    );
}