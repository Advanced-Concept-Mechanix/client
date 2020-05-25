import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import styles from './style';
import Mybutton from '../components/mybutton';

export default function scan({ navigation }){
    
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        let loading = true;

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

        getScanPermission();

        return () => {
            loading = false;
        };
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        navigation.navigate('NewTransaction', {data:data})
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