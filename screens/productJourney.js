import React, {useState, useEffect, useCallback, Component} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  FlatList,
  Dimensions,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import styles from './style';
import getData from '../functions/getData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Mybutton from '../components/mybutton';
import isJson from '../functions/isJson';
import hasProperties from '../functions/hasProperties';

export default function SingleProduct({navigation, route}){
    const productData = global.PRODUCTDATA;
    const data = productData.data;
    const loc = productData.loc;
    console.log(loc);
    const[transactions, setTransactions] = useState([]);
    const[loadingText, setLoadingText] = useState('Loading Transactions...');

    useEffect(() => {
        let loading = true;

        async function fetchData(){
            if(isJson(data)){
                let json = await JSON.parse(data);
                let arrProps = ["UUID", "dateOfExpiry", "dateOfManufacture", "description", "manufacturer", "name", "nonce", "profileId"];
                if(hasProperties(arrProps,json)){
                    await getData(`http://62.171.181.137/transactions/${json.UUID}`)
                    .then(async (response) => {
                        if(response.ok){
                            let data = await response.json();
                            if(data.transactions.length === 0){
                                setLoadingText('No Transactions Found!');
                            }

                            if(loading){
                                setTransactions(data.transactions);
                                //console.log(data.transactions);
                            }
                        }else{
                            let data = await response.json();
                            console.log('Failure: ', data);
                            Alert.alert(
                                'Failed',
                                data.message,
                                [
                                    {
                                        text: 'Ok'
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
                    setLoadingText("Invalid Data. Wrong Properties");
                }
            }else{
                setLoadingText("Invalid Data. The data is not JSON");
            } 
        }

        fetchData();

        return () => {
            loading = false;
        };
    }, [data]);

    const mapViewMarkers = () => {
        //console.log(transactions);
        return transactions.map((transaction) => 
            <Marker
            key={transaction._id}
            coordinate={{ latitude: transaction.location.latitude, longitude: transaction.location.longitude }}
            title={`User: ${transaction.user}`}
            description={`Timestamp: ${transaction.createdAt}`}
            >
            </Marker >
        );
    }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    if(transactions.length === 0){
        return(
            <View style={styles.container}>
                <Text style={{ marginTop: 20}}>{loadingText}</Text>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <MapView
                    style={{ ...StyleSheet.absoluteFillObject }}
                    initialRegion={{
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                        latitudeDelta: .005,
                        longitudeDelta: .005
                    }} >
                    {mapViewMarkers()}
                </MapView>
            </View>
        );
    }
}