import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert } from 'react-native';

import styles from './style';
import hash from '../functions/hash';
import convertNum from '../functions/convertNumToString';

export default function authentic({ navigation, route}){

    const productData = global.PRODUCTDATA;
    const data = productData.data;
    
    //const{data} = route.params;
    const[authentication, setAuthentication] = useState(null);
    const[loadingText, setLoadingText] = useState('Checking...');

    useEffect(() => {
        let loading = true;

        async function authenticate(){
            let dataObj = await JSON.parse(data);
            if(typeof dataObj !== 'object' || dataObj === null){
                setAuthentication(false);
            }else{
                let nonceString = '0.' + dataObj.nonce;
                let nonceNum = parseFloat(nonceString);
                let randomString = convertNum(nonceNum);

                let currentUUID = await hash(dataObj.profileId + dataObj.manufacturer + randomString);
                console.log(`nonceNum: ${nonceNum} type: ${typeof nonceNum}`);
                console.log(`nonceString: ${nonceString} type: ${typeof nonceString}`);
                console.log(`randomString: ${randomString}`);
                console.log(`currentUUID: ${currentUUID}`);
                setAuthentication(currentUUID === dataObj.UUID);
            }
        }

        if(loading){
            authenticate();
        }

        return () => {
            loading = false;
        };
    },[data])

    if(authentication === null){
        return(
            <View style={styles.container}>
                <Text>{loadingText}</Text>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <Text>{`Authentication: ${authentication.toString()}`}</Text>
            </View>
        );
    }
}