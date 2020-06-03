import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert } from 'react-native';

import styles from './style';
import Mybutton from '../components/mybutton';
import postData from '../functions/postData';

export default function newTransaction({ navigation, route }){

    const{data} = route.params;
    const{user_id} = route.params;
    const{loc} = route.params;
    const{time} = route.params;
    const[locationText, setLocationText] = useState(null);
    const[scanText, setScanText] = useState(null);
    const[UUIDText, setUUIDText] = useState(null);
    const[userText, setUserText] = useState(null);
    const[hashText, setHashText] = useState(null);
    const[timeText, setTimeText] = useState(null)
    const[loadingText, setLoadingText] = useState('Creating Transaction...');

    useEffect(() => {
        let loading = true;
        const url = 'http://62.171.181.137/transactions/new';

        async function confirmDetails(){
            if(user_id){
                if(loc){
                    if(data){
                        if(time){
                            return true;
                        }else{
                            alert('Timestamp is not set');
                            return false;
                        }
                    }else{
                        alert('Product is not set');
                        return false;
                    }
                }else{
                    alert('Location is not set');
                    return false;
                }
            }else{
                alert('User is not set');
                return false;
            }
        }

        async function createTx(){
            await confirmDetails()
            .then(async(status) => {
                if(loading){
                    if(status === false){
                        alert('Cannot create transaction at this time');
                    }else{
                        let dataObj = JSON.parse(data);
                        let tx = {
                            _id:dataObj.UUID,
                            user:user_id,
                            location:loc,
                            product:dataObj.name,
                            createdAt:time
                        }

                        await postData(url, tx)
                        .then(async(response) => {
                            if(response.ok){
                                let data = await response.json();
                                //console.log('Success:', data);
                                if(loading){
                                    setUUIDText(`UUID: ${data.transaction.UUID}`);
                                    setScanText(`Product: ${data.transaction.product}`);
                                    setLocationText(`Location: ${data.transaction.location}`);
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

    
    if(!locationText || !scanText || !userText || !timeText || !hashText || !UUIDText){
        return(
            <View style={styles.container}>
                <Text>{loadingText}</Text>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Text>{loadingText}</Text>
            <Text>{UUIDText}</Text>
            <Text>{locationText}</Text>
            <Text>{scanText}</Text>
            <Text>{userText}</Text>
            <Text>{timeText}</Text>
            <Text>{hashText}</Text>
        </View>
    );
}