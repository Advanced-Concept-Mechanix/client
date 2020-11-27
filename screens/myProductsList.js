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
import Mybutton from '../components/mybutton';
import MyList from '../components/myList';
import LottieView from 'lottie-react-native';
import del from '../functions/del';

export default function myProductList({navigation, route}){
    const{item} = route.params;
    const[products, setProducts] = useState([]);
    const[loadingText, setLoadingText] = useState('Loading products...');
    const[isFetching, setIsFetching] = useState(false);
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/968-loading.json'));
    const[progress, setProgress] = useState(0);
    const[loadingProducts, setLoadingProducts] = useState(true);


    async function fetchData(){
        await getData(`http://62.171.181.137/createProducts/${item._id}`)
        .then(async (response) => {
            setIsFetching(false);
            setLoadingProducts(false);
            if(response.ok){
                let data = await response.json();
                if(data.products.length === 0){
                    setLoadingText('No Products Found!');
                }else{
                    setProducts(data.products);
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
    }

    const deleteProduct = async () => {
        await del(`http://62.171.181.137/products/delete/${item._id}`)
        .then(async (response) => {
            if(response.ok){
                let data = await response.json();
                Alert.alert(
                    'Success',
                    data.msg,
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
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
    }


    useEffect(() => {
        let loading = true;

        if(loading){
            fetchData();
        }

        return () => {
            loading = false;
        };
    }, [fetchData]);

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    const refresh =() => {
        setIsFetching(true);
        fetchData();
    }

    if(products.length === 0){
        if(loadingProducts){
            return(
                <View style={styles.containerDark}>
                    <LottieView 
                        speed={1}
                        source={loadingAnimation}
                        style={styles.lottie}
                        loop={true}
                        autoPlay={true}
                        progress={progress}
                    >
                    </LottieView>
                </View>
            );
        }
        return(
            <View style={styles.container}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text>Profile</Text>
                    <Text>Id: {item._id}</Text>
                    <Text>Name: {item.name}</Text>
                    <Text>Manufacturer: {item.manufacturer}</Text>
                    <Text>Description: {item.description}</Text>
                    <Text>Date Of Manufacture: {item.dateOfManufacture}</Text>
                    <Text>Days Before Expiry: {item.daysBeforeExpiry}</Text>

                    <Text style={{ marginTop: 20}}>{loadingText}</Text>
                    <Mybutton
                    title='Delete'
                    customClick={deleteProduct}
                    />
                    <Mybutton
                    title='Update Profile'
                    customClick={() => navigation.navigate('updateProduct', {product:item})}
                    />
                </View>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <Text>List of Products Created Using Profile</Text>
                <MyList 
                    data={products}
                    keyExtractor={(item) => item._id}
                    onRefresh={refresh}
                    refreshing={isFetching}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigation.navigate('singleProduct', {
                            item: item
                        })} style={styles.item}>
                            <View style={{ backgroundColor: 'white', padding: 20 }}>
                                <Text>Name: {item.name}</Text>
                                <Text>Date of Manufacture: {item.dateOfManufacture}</Text>
                                <Text>Date of Expiry: {item.dateOfExpiry}</Text>
                                <Text>Description: {item.description}</Text>
                                <Text>Manufacturer: {item.manufacturer}</Text>
                                <Text>Id: {item._id}</Text>
                            </View>
                        </TouchableOpacity> 
                    } 
                />
                <Mybutton
                title='Delete'
                customClick={deleteProduct}
                />
                <Mybutton
                title='Update Profile'
                customClick={() => navigation.navigate('updateProduct', {product:item})}
                />
            </View>
        );
    }
}