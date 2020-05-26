import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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

    useEffect(() => {
        let loading = true;

        async function fetchUser(){
            return await store('user');
        }

        async function getScanPermission(){
            await BarCodeScanner.requestPermissionsAsync()
            .then(async({ status }) => {
                if(loading){
                    if(status !== 'granted'){
                        alert('Permission to scan denied');
                    }
                }
            });
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
                    }
                }
            })
        }


        getScanPermission();
        fetchUser()
        .then((user) => {
            if(!user){
                setUser('No user found');
            }else{
                setUser(user.id);
            }
        });
        getLocation();

        return () => {
            loading = false;
        };
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        navigation.navigate('NewTransaction', {data:data, user_id:user, loc:location, time:timestamp})
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        //console.log("type: " + type + "data: " + data);
        // Alert.alert(
        //     'Success',
        //     'The scan was successful',
        //     [
        //         {
        //             text: 'Ok',
        //             onPress: () => navigation.navigate('NewTransaction', {data:data})
        //         },
        //     ],
        //     { cancelable: false }
        // );
    };

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