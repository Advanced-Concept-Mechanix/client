import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './style';
import isJson from '../functions/isJson';
import hasProperties from '../functions/hasProperties';

export default function productDetails(){

    const productData = global.PRODUCTDATA;
    const data = productData.data;
    const[dataObj, setDataObj] = useState(null);
    const[loadingText, setLoadingText] = useState('Loading Product Details...');
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/968-loading.json'));
    const[progress, setProgress] = useState(0);

    useEffect(() => {

        let loading = true;

        async function confirmData(){
            if(isJson(data)){
                let json = await JSON.parse(data);
                let arrProps = ["UUID", "dateOfExpiry", "dateOfManufacture", "description", "manufacturer", "name", "nonce", "profileId"];
                if(hasProperties(arrProps,json)){
                    setDataObj(json);
                }else{
                    setLoadingText("Invalid Data. Wrong Properties");
                }
            }else{
                setLoadingText("Invalid Data. The data is not JSON");
            }
        }

        if(loading){
            confirmData();
        }

        return () => {
            loading = false;
        };
    },[data]);

    if(!dataObj){
        return(
            <View style={styles.containerDark}>
                <LottieView 
                    speed={1}
                    source={loadingAnimation}
                    style={styles.lottie}
                    loop={true}
                    autoPlay={true}
                    progress={progress}
                >
                </LottieView>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Text>Name: {dataObj.name}</Text>
            <Text>UUID: {dataObj.UUID}</Text>
            <Text>Date Of Manufacture: {dataObj.dateOfManufacture}</Text>
            <Text>Date of Expiry: {dataObj.dateOfExpiry}</Text>
            <Text>Description: {dataObj.description}</Text>
            <Text>Manufacturer: {dataObj.manufacturer}</Text>
        </View>
    );
}