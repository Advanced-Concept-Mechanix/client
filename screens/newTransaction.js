import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert } from 'react-native';

import styles from './style';
import Mybutton from '../components/mybutton';
import postData from '../functions/postData';
import isJson from '../functions/isJson';
import hasProperties from '../functions/hasProperties';

export default function newTransaction({ navigation, route }){

    const productData = global.PRODUCTDATA;
    const data = productData.data;
    const user_id = productData.user_id;
    const loc = productData.loc;
    console.log(loc);
    console.log(`product data: ${data}`);
    const time = productData.time;
    const[dataObj, setDataObj] = useState(null);
    const[locationText, setLocationText] = useState(null);
    const[scanText, setScanText] = useState(null);
    const[userText, setUserText] = useState(null);
    const[hashText, setHashText] = useState(null);
    const[timeText, setTimeText] = useState(null)
    const[loadingText, setLoadingText] = useState('Creating Transaction...');

    useEffect(() => {
        let loading = true;
        const url = 'http://62.171.181.137/transactions/new';

        async function confirmData(){
            if(isJson(data)){
                let json = await JSON.parse(data);
                let arrProps = ["UUID", "dateOfExpiry", "dateOfManufacture", "description", "manufacturer", "name", "nonce", "profileId"];
                let locProps = ["latitude", "longitude"];
                if(hasProperties(arrProps,json)){
                    console.log(`product data is okay`);
                    setDataObj(json);
                    if(user_id){
                        if(hasProperties(locProps, loc)){
                            console.log(`location props okay`);
                            if(time){
                                return true;
                            }else{
                                alert('Timestamp is not set');
                                return false;
                            }
                        }else{
                            alert('Invalid Location Data');
                            return false;
                        }
                    }else{
                        alert('User is not set');
                        return false;
                    }
                }else{
                    setLoadingText("Invalid Data. Wrong Properties");
                    return false;
                }
            }else{
                setLoadingText("Invalid Data. The data is not JSON");
                return false;
            }
        }

        // async function confirmDetails(){
        //     let locProps = ["latitude", "longitude"];
        //     await confirmData()
        //     .then(async(status) =>{
        //         if(status === false){
        //             alert("Invalid Product Data");
        //             return false;
        //         }else{
        //             if(user_id){
        //                 if(hasProperties(locProps, loc)){
        //                     console.log(`location props okay`);
        //                     if(time){
        //                         return true;
        //                     }else{
        //                         alert('Timestamp is not set');
        //                         return false;
        //                     }
        //                 }else{
        //                     alert('Location is not set');
        //                     return false;
        //                 }
        //             }else{
        //                 alert('User is not set');
        //                 return false;
        //             }
        //         }
        //     })
        // }

        async function createTx(){
            await confirmData()
            .then(async(status) => {
                if(loading){
                    if(status === false){
                        alert('Cannot create transaction at this time');
                    }else{
                        let tx = {
                            user:user_id,
                            location:loc,
                            product:dataObj.UUID,
                            createdAt:time
                        }

                        await postData(url, tx)
                        .then(async(response) => {
                            if(response.ok){
                                let data = await response.json();
                                //console.log('Success:', data);
                                if(loading){
                                    setScanText(`Product: ${data.transaction.product}`);
                                    setLocationText(`Latitude: ${data.transaction.location.latitude}, Longitude: ${data.transaction.location.longitude}`);
                                    setUserText(`User: ${data.transaction.user}`);
                                    setTimeText(`Created At: ${data.transaction.createdAt}`);
                                    setHashText(`Hash: ${data.transaction.hash}`);
                                    setLoadingText('Transaction created!');
                                }
                            }else{
                                let data = await response.json();
                                console.log('Failure:', data);
                                Alert.alert(
                                    'Failure',
                                    data.message,
                                    [
                                        {
                                            text: 'Ok',
                                            //onPress: () => navigation.navigate('Scan'),
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    }
                }
            })
            
        }

        createTx();

        return () => {
            loading = false;
        };
    }, [data, user_id, loc, time]);

    
    if(!locationText || !scanText || !userText || !timeText || !hashText){
        return(
            <View style={styles.container}>
                <Text>{loadingText}</Text>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Text>{loadingText}</Text>
            <Text>{locationText}</Text>
            <Text>{scanText}</Text>
            <Text>{userText}</Text>
            <Text>{timeText}</Text>
            <Text>{hashText}</Text>
        </View>
    );
}