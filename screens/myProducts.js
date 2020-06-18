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
import MyList from '../components/myList';
import LottieView from 'lottie-react-native';

export default function myProducts({ navigation, route}){

    const[products, setProducts] = useState([]);
    //const[user, setUser] = useState(null);
    const user = global.User;
    const[loadingText, setLoadingText] = useState('Loading Products...');
    const[isFetching, setIsFetching] = useState(false);
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/968-loading.json'));
    const[progress, setProgress] = useState(0);

    //console.log(user_id);

    async function fetchData(){
        await getData(`http://62.171.181.137/products/${user.id}`)
        .then(async(response) => {
            setIsFetching(false);
            if(response.ok){
                //console.log(response);
                let data = await response.json();
                //console.log(data);
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
    }

    //usEffect to get url and fetch products
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
    }else{
        return(
            <View style={styles.container}>
                <MyList 
                    data={products}
                    keyExtractor={(item) => item._id}
                    onRefresh={refresh}
                    refreshing={isFetching}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigation.navigate('myProductsList', {
                            item: item
                        })} style={styles.item}>
                            <View style={{ backgroundColor: 'white', padding: 20 }}>
                                <Text>Name: {item.name}</Text>
                                <Text>Manufacturer: {item.manufacturer}</Text>
                                <Text>Description: {item.description}</Text>
                                <Text>Date Of Manufacture: {item.dateOfManufacture}</Text>
                                <Text>Days Before Expiry: {item.daysBeforeExpiry}</Text>
                                <Text>Id: {item._id}</Text>
                            </View>
                        </TouchableOpacity> 
                    } 
                />
            </View>
        );
    }

}