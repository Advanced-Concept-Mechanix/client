import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert } from 'react-native';

import styles from './style';
import isJson from '../functions/isJson';
import hasProperties from '../functions/hasProperties';

export default function productDetails(){

    const productData = global.PRODUCTDATA;
    const data = productData.data;
    //const{data} = route.params;
    // const dataObj = JSON.parse(data);
    const[dataObj, setDataObj] = useState(null);
    const[loadingText, setLoadingText] = useState('Loading Product Details...');

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
            <View style={styles.container}>
                <Text>{loadingText}</Text>
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