import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, ActivityIndicatorBase } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';

import styles from './style';
import Mybutton from '../components/mybutton';
import store from '../functions/store';

import postData from '../functions/postData';
import isJson from '../functions/isJson';
import hasProperties from '../functions/hasProperties';

export default function scan({ navigation }){
    
    const[scanned, setScanned] = useState(false);
    const[user, setUser] = useState(null);
    const[location, setLocation] = useState(null);
    const[timestamp, setTimestamp] = useState(null);
    const[locationPermission, setLocationPermission] = useState(false);
    const[scanPermission, setScanPermission] = useState(false);
    const[locationEnable, setLocationEnable] = useState(false);
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/24344-retro-loading-bar.json'));
    const[progress, setProgress] = useState(0);

    const ChangeAnimation = (url) => {
        setLoadingAnimation(url);
        setProgress(0);
    }

    const recheck = () => {
        setTimeout(() => {
            if(!locationEnable)setLocationEnable(true);
            if(!scanPermission)setScanPermission(true);
            if(!locationPermission)setLocationPermission(true);
            if(!user)setUser(true);
        }, 5000);
    }

    //UseEffect for getting user
    useEffect(() => {
        let loading = true;

        async function fetchUser(){
            return await store('user');
        }

        if(loading){
            if(!user){
                fetchUser()
                .then((user) => {
                    if(!user){
                        Alert.alert(
                            'Login Failed',
                            'Please login first',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('login'),
                                },
                            ],
                            { cancelable: false }
                        );
                        setUser(null)
                    }else{
                        setUser(user.name);
                        global.User = user;
                    }
                });
            }
        }

        return () => {
            loading = false;
        };
        
    }, [user])

    //useEffect for getting scan permissions

    useEffect(() => {

        let loading = true;

        async function getScanPermission(){
            await BarCodeScanner.requestPermissionsAsync()
            .then(async({ status }) => {
                if(loading){
                    if(status !== 'granted'){
                        alert('Permission to scan was denied');
                        setScanPermission(false);
                        ChangeAnimation(require('../assets/lottie/10568-camera-permission.json'));
                    }else{
                        setScanPermission(true);
                    }
                }
            });
        }

        if(loading){
            if(!scanPermission){
                getScanPermission();
            }
        }

        return () => {
            loading = false;
        };
    }, [scanPermission])

    //UseEffect for getting location permission and location

    useEffect(() => {

        let loading = true;

        async function getLocationPermission(){
            return await Location.requestPermissionsAsync();
        }

        async function getLocation(){
            let locationEnabled = await Location.hasServicesEnabledAsync();
            console.log(`locationEnabled: ${locationEnabled}`);
            if(loading){
                if (!locationEnabled) {
                    // alert('Please turn on location services');
                    Alert.alert(
                        'Location',
                        'Please turn on location services',
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    ChangeAnimation(require('../assets/lottie/96-permission (1).json'));
                                    recheck();
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                    setLocationEnable(false);
                }else{
                    setLocationEnable(true);
                    await getLocationPermission()
                    .then(async({ status }) => {
                        if(status !== 'granted'){
                            alert('Permission to access location was denied');
                            setLocationPermission(false);
                            ChangeAnimation(require('../assets/lottie/4199-location-search.json'));
                        }else{
                            setLocationPermission(true);
                            let loc = await Location.getCurrentPositionAsync({});
                            //console.log(typeof loc);
                            //console.log(loc);
                            let lat = loc.coords.latitude;
                            let lon = loc.coords.longitude;
                            let time = loc.timestamp;
                            //console.log(typeof lat);
                            //console.log(typeof lon);
                            setLocation({
                                latitude:lat,
                                longitude:lon
                            });
                            setTimestamp(time);
                        }
                    })
                }
            }
        }

        if(loading){
            // if(!location || !timestamp || !locationPermission || !locationEnable){
            //     getLocation();
            // }
            getLocation();
        }

        return () => {
            loading = false;
        };

    }, [location, timestamp, locationEnable, locationPermission])

    
    const handleBarCodeScanned = async({ type, data }) => {
        setScanned(true);
        let url = 'http://62.171.181.137/transactions/new';
        if(isJson(data)){
            let json = await JSON.parse(data);
            let prodProps = ["UUID", "dateOfExpiry", "dateOfManufacture", "description", "manufacturer", "name", "nonce", "profileId"];
            let locProps = ["latitude", "longitude"];
            if(hasProperties(prodProps,json)){
                console.log(`product props okay`);
                if(hasProperties(locProps, location)){
                    console.log(`location props okay`);
                    global.PRODUCTDATA = {
                        data:data, 
                        user_id:user, 
                        loc:location, 
                        time:timestamp
                    }
                    let tx = {
                        user:user,
                        location:location,
                        product:json.UUID,
                        createdAt:timestamp
                    }

                    await postData(url, tx)
                        .then(async(response) => {
                            if(response.ok){
                                let data = await response.json();
                                //console.log('Success:', data);
                                Alert.alert(
                                    'Success',
                                    'Transaction Created',
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => navigation.navigate('scanningNav'),
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
                    alert("Invalid Location Data. Wrong Properties");
                }
            }else{
                alert("Invalid Data. Wrong Properties");
            }
        }else{
            alert("Invalid Data. The data is not JSON");
        }
        //navigation.navigate('scanningNav');
        //navigation.navigate('scanningNav', {data:data, user_id:user, loc:location, time:timestamp})
    };

    if(!location || !user || !timestamp || !scanPermission ||!locationPermission){
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
    }else{
        return(
            <View style={styles.container}>
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
    
                {scanned && <Mybutton title={'Scan'} customClick={() => setScanned(false)} />}
            </View>
        );
    }
}