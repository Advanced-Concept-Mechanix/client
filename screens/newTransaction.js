import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import styles from './style';
import Mybutton from '../components/mybutton';

export default function newTransaction({ navigation }){
    
    const[location, setLocation] = useState(null);
    const[locationText, setLocationText] = useState('Loading Location...');

    useEffect(() => {
        let loading = true;

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
                        setLocation(loc);
                        setLocationText(JSON.stringify(loc))
                    }
                }
            })
        }

        getLocation();

        return () => {
            loading = false;
        };
    }, []);

    return(
        <View style={styles.container}>
            <Text>{locationText}</Text>
        </View>
    );
}