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
import postData from '../functions/postData';

function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}

export default function createQr({ route }){

    const{item} = route.params;
    const url = 'http://62.171.181.137/createProducts/new';
    console.log(item);
    const[qrText, setQrText] = useState('change me');
    const[qrTextHolder, setQrTextHolder] = useState('');
    const[qrNum, setQrNum] = useState(0);
    const[update, setUpdate] = useState(false);
    // const[qrData, setQrData] = useState([]);
    const qrDataSet = [];

    const getQrData = async() => {
        if(qrNum === 0){
            alert('Please set a number!');
        }
        //setUpdate(true);
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
            await postData(url, _qrdata)
            .then(async(response) => {
                if(response.ok){
                    let data = await response.json();
                    console.log('Success:', data);
                    Alert.alert(
                        'Success',
                        'Qr data successfully added',
                        [
                            {
                                text: 'Ok',
                                //onPress: () => navigation.navigate('login'),
                            },
                        ],
                        { cancelable: false }
                    );
                }else{
                    qrDataSet.length = 0;
                    let data = await response.json();
                    console.log('Failure:', data);
                    Alert.alert(
                        'Failure',
                        data.message,
                        [
                            {
                                text: 'Ok',
                                //onPress: () => navigation.navigate('login'),
                            },
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            qrDataSet.push(_qrdata);
        }
        // console.log(qrDataSet);
        // console.log(`data length: ${qrDataSet.length}`);
        // console.log(`qrNum: ${qrNum}`);
        // console.log((qrDataSet.length == qrNum).toString());
        // console.log(typeof qrDataSet.length + ' ' + typeof qrNum);
        if(qrDataSet.length == qrNum){
            console.log(qrDataSet);
        }
        
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