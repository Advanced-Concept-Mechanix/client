import React, {useState, useEffect} from 'react';
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

export default function myProducts({ navigation, route}){

    const[products, setProducts] = useState([]);
    //const[user, setUser] = useState(null);
    const user = global.User;
    const[loadingText, setLoadingText] = useState('Loading Products...');
    //console.log(user_id);

    //UseEffect for getting user
    // useEffect(() => {
    //     let loading = true;

    //     async function fetchUser(){
    //         return await store('user');
    //     }

    //     if(loading){
    //         if(!user){
    //             fetchUser()
    //             .then((user) => {
    //                 if(!user){
    //                     alert('Please login first');
    //                     setUser(null)
    //                 }else{
    //                     setUser(user.id);
    //                 }
    //             });
    //         }
    //     }

    //     return () => {
    //         loading = false;
    //     };
        
    // }, [user])

    //usEffect to get url and fetch products
    useEffect(() => {

        let loading = true;

        async function fetchData(){
            await getData(`http://62.171.181.137/products/${user.id}`)
            .then(async(response) => {
                if(response.ok){
                    //console.log(response);
                    let data = await response.json();
                    //console.log(data);
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
            })
        }

        fetchData();

        return () => {
            loading = false;
        };
    }, [user]);

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
                    <TouchableOpacity onPress={() => navigation.navigate('singleProduct', {
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