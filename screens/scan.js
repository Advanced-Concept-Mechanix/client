import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

import styles from './style';

export default function scan({ navigation }){
    
    const[location, setLocation] = useState(null);
    const[locationText, setLocationText] = useState('Loading Location...');

    useEffect(() => {
        let loading = true;

        async function getPermission(){
            return await Location.requestPermissionsAsync();
        }

        async function getLocation(){
            await getPermission()
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