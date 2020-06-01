import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';

import styles from './style';
import Mybutton from '../components/mybutton';
import store from '../functions/store';

export default function scan({ navigation }){
    
    const[scanned, setScanned] = useState(false);
    const[user, setUser] = useState(null);
    const[location, setLocation] = useState(null);
    const[timestamp, setTimestamp] = useState(null);
    const[locationPermission, setLocationPermission] = useState(false);
    const[scanPermission, setScanPermission] = useState(false);
    const[locationEnable, setLocationEnable] = useState(false);

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
                        alert('Please login first');
                        setUser(null)
                    }else{
                        setUser(user.id);
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
            //console.log(`locationEnabled: ${locationEnabled}`);
            if(loading){
                if (!locationEnabled) {
                    alert('Please turn on location services');
                    setLocationEnable(false);
                }else{
                    setLocationEnable(true);
                    await getLocationPermission()
                    .then(async({ status }) => {
                        if(status !== 'granted'){
                            alert('Permission to access location was denied');
                            setLocationPermission(false);
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
                            setLocation(`${lat}, ${lon}`);
                            setTimestamp(time);
                        }
                    })
                }
            }
        }

        if(loading){
            if(!location || !timestamp || !locationPermission || !locationEnable){
                getLocation();
            }
        }

        return () => {
            loading = false;
        };

    }, [location, timestamp, locationEnable, locationPermission])

    const handleChecks = () => {
        if(!locationEnable)setLocationEnable(true)
        if(!scanPermission)setScanPermission(true)
        if(!locationPermission)setLocationPermission(true)
        if(!user)setUser(true);
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        navigation.navigate('newTransaction', {data:data, user_id:user, loc:location, time:timestamp})
    };

    if(!location || !user || !timestamp || !scanPermission ||!locationPermission){
        return(
            <View style={styles.container}>
                <Text>Checking Permissions...</Text>
                <Mybutton 
                title="Check again"
                customClick={handleChecks}
                />
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