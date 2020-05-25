import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';

import styles from './style';
import Mybutton from '../components/mybutton';
import store from '../functions/store';
import postData from '../functions/postData';

export default function newTransaction({ navigation, route }){

    const url = 'http://62.171.181.137/transactions/new';
    const{data} = route.params;
    const[location, setLocation] = useState(null);
    const[user, setUser] = useState(null);
    const[product, setProduct] = useState(null);
    const[timestamp, setTimestamp] = useState(null);
    const[locationText, setLocationText] = useState('Loading Location...');
    const[scanText, setScanText] = useState('Loading scanning results...');
    const[userText, setUserText] = useState('Loading User...');
    const[timeText, setTimeText] = useState('Loading timestamp....')

    useEffect(() => {
        let loading = true;

        async function fetchUser(){
            return await store('user');
        }

        async function getScan(){
            if(loading){
                //console.log(data + ' ' + typeof data);
                setScanText(`Product: ${data}`);
                setProduct(data);
            }
        }

        async function getLocationPermission(){
            return await Location.requestPermissionsAsync();
        }

        async function getLocation(){
            await getLocationPermission()
            .then(async({ status }) => {
                if(loading){
                    if (status !== 'granted') {
                        setLocationText('Permission to access location was denied');
                    }else{
                        let loc = await Location.getCurrentPositionAsync({});
                        //console.log(typeof loc);
                        //console.log(loc);
                        let lat = loc.coords.latitude;
                        let lon = loc.coords.longitude;
                        let time = loc.timestamp;
                        //console.log(typeof lat);
                        //console.log(typeof lon);
                        setLocation(`${lat}, ${lon}`);
                        setTimestamp(time);
                        setTimeText(`Time: ${time}`);
                        setLocationText(`Location: ${lat}, ${lon}`);
                    }
                }
            })
        }

        getScan();
        getLocation();
        fetchUser()
        .then((user) => {
            if(!user){
                setUserText('No user found');
            }else{
                setUserText(`User Id: ${user.id}`);
                setUser(user.id);
            }
        });

        return () => {
            loading = false;
        };
    }, [data]);

    const createTransaction = async () => {
        if(user){
            if(location){
                if(product){
                    if(timestamp){
                        let tx = {
                            user:user,
                            location:location,
                            product:product,
                            createdAt:timestamp
                        }

                        await postData(url, tx)
                        .then(async(response) => {
                            if(response.ok){
                                let data = await response.json();
                                console.log('Success:', data);
                                Alert.alert(
                                    'Success',
                                    data.msg,
                                    [
                                        {
                                            text: 'Ok',
                                        },
                                    ],
                                    { cancelable: false }
                                );
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
                    }else{
                        alert('Timestamp is not set');
                    }
                }else{
                    alert('Product is not set');
                }
            }else{
                alert('Location is not set');
            }
        }else{
            alert('User is not set');
        }
    }

    return(
        <View style={styles.container}>
            <Text>{locationText}</Text>
            <Text>{scanText}</Text>
            <Text>{userText}</Text>
            <Text>{timeText}</Text>
            <Mybutton
            title="Create Transaction"
            customClick={createTransaction}
            />
        </View>
    );
}