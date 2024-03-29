import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert, Image } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './style';
import hash from '../functions/hash';
import convertNum from '../functions/convertNumToString';
import isJson from '../functions/isJson';
import hasProperties from '../functions/hasProperties';

export default function authentic({ navigation, route}){

    const productData = global.PRODUCTDATA;
    const data = productData.data;
    
    //const{data} = route.params;
    const[authentication, setAuthentication] = useState(null);
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/8478-checking.json'));
    const[progress, setProgress] = useState(0);

    useEffect(() => {
        let loading = true;

        async function authenticate(){
            if(isJson(data)){
                let dataObj = await JSON.parse(data);
                let arrProps = ["UUID", "dateOfExpiry", "dateOfManufacture", "description", "manufacturer", "name", "nonce", "profileId"];
                if(hasProperties(arrProps,dataObj)){
                    let nonceString = '0.' + dataObj.nonce;
                    let nonceNum = parseFloat(nonceString);
                    let randomString = convertNum(nonceNum);

                    let currentUUID = await hash(dataObj.profileId + dataObj.manufacturer + randomString);
                    // console.log(`nonceNum: ${nonceNum} type: ${typeof nonceNum}`);
                    // console.log(`nonceString: ${nonceString} type: ${typeof nonceString}`);
                    // console.log(`randomString: ${randomString}`);
                    // console.log(`currentUUID: ${currentUUID}`);
                    setAuthentication(currentUUID === dataObj.UUID);
                }else{
                    alert("Invalid Data. Wrong Properties");
                    setAuthentication(false);
                }
            }else{
                alert("Invalid Data. The data is not JSON");
                setAuthentication(false);
                console.log(data);
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
    }else if(authentication === false){
        return(
            <View style={styles.container}>
                {/* <Text>{`Authentication: ${authentication.toString()}`}</Text> */}
                <Image 
                source={require("../assets/no.webp")}
                />
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                {/* <Text>{`Authentication: ${authentication.toString()}`}</Text> */}
                <Image 
                source={require("../assets/ok.webp")}
                />
            </View>
        );
    }
}