import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import styles from './style';
import Mybutton from '../components/mybutton';

export default function scan({ navigation }){
    
    const[scanData, setScanData] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        let loading = true;

        async function getScanPermission(){
            await BarCodeScanner.requestPermissionsAsync()
            .then(async({ status }) => {
                if(loading){
                    if(status !== 'granted'){
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
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setScanData(data);
    };

    return(
        <View style={styles.container}>
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            />

            {scanned && <Mybutton title={'Tap to Scan Again'} customClick={() => setScanned(false)} />}
        </View>
    );
}