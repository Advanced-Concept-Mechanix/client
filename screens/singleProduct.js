import React, {useState, useEffect, useCallback, Component} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  FlatList
} from 'react-native';
import styles from './style';
import getData from '../functions/getData';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SingleProduct({navigation, route}){
    const{item} = route.params;
    const[transactions, setTransactions] = useState([]);
    const[loadingText, setLoadingText] = useState('Loading Transactions...');

    useEffect(() => {
        let loading = true;

        function getFetchUrl(){
            return 'http://62.171.181.137/transactions/' + item._id;
        }

        async function fetchData(){
            await getData(getFetchUrl())
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
            });
        }

        fetchData();

        return () => {
            loading = false;
        };
    }, [item]);

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    if(transactions.length === 0){
        return(
            <View style={styles.container}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text>Id: {item._id}</Text>
                    <Text>Name: {item.name}</Text>
                    <Text>Manufacturer: {item.manufacturer}</Text>
                    <Text>Description: {item.description}</Text>
                    <Text>Date Of Manufacture: {item.dateOfManufacture}</Text>
                    <Text>Days Before Expiry: {item.daysBeforeExpiry}</Text>

                    <Text style={{ marginTop: 20}}>{loadingText}</Text>
                </View>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <Text>Product Details</Text>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text>Id: {item._id}</Text>
                    <Text>Name: {item.name}</Text>
                    <Text>Manufacturer: {item.manufacturer}</Text>
                    <Text>Description: {item.description}</Text>
                    <Text>Date Of Manufacture: {item.dateOfManufacture}</Text>
                    <Text>Days Before Expiry: {item.daysBeforeExpiry}</Text>
                </View>
                <Text>List of Transactions</Text>
                <FlatList 
                data={transactions}
                ItemSeparatorComponent={ListViewItemSeparator}
                renderItem={({ item }) =>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text>Id: {item._id}</Text>
                            <Text>Timestamp: {item.createdAt}</Text>
                            <Text>Creator: {item.user}</Text>
                            <Text>Location: {item.location}</Text>
                            <Text>Hash: {item.hash}</Text>
                        </View>
                    </TouchableOpacity> 
                } 
                keyExtractor={(item) => item._id}
                />
            </View>
        );
    }
}