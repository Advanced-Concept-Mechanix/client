import React, {useState, useEffect, Component} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  SectionList,
  FlatList
} from 'react-native';
import styles from './style';
import getData from '../functions/getData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import store from '../functions/store';

export default function AllProducts({navigation}){
    const[products, setProducts] = useState([]);
    const[loadingText, setLoadingText] = useState('Loading Products...');

    useEffect(() => {
        let loading = true;

        async function fetchUrl(){
            await store('user')
            .then((user) => {
                if(!user){
                    alert('Please login first');
                }else{
                    let url = 'http://62.171.181.137/products/' + user.id;
                    //console.log(url);
                    return url;
                }
            });
        }

        async function fetchData(){
            await getData(fetchUrl())
            .then(async (response) => {
                if(response.ok){
                    let data = await response.json();
                    console.log(data);
                    if(data.products.length === 0){
                        setLoadingText('No Products Found!');
                    }

                    if(loading){
                        setProducts(data.products);
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
    }, []);

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    if(products.length === 0){
        return(
            <View style={styles.container}>
                <Text>{loadingText}</Text>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <Text>List of My Products</Text>
                <FlatList 
                data={products}
                ItemSeparatorComponent={ListViewItemSeparator}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigation.navigate('SingleProduct', {
                        item: item
                    })}>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text>Id: {item._id}</Text>
                            <Text>Name: {item.name}</Text>
                            <Text>Manufacturer: {item.manufacturer}</Text>
                            <Text>Description: {item.description}</Text>
                            <Text>Date Of Manufacture: {item.dateOfManufacture}</Text>
                            <Text>Days Before Expiry: {item.daysBeforeExpiry}</Text>
                        </View>
                    </TouchableOpacity> 
                } 
                keyExtractor={(item) => item._id}
                />
            </View>
        );
    }
}