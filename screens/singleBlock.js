import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  FlatList
} from 'react-native';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Mybutton from '../components/mybutton';
import LottieView from 'lottie-react-native';
import MyList from '../components/myList';

export default function SingleProduct({navigation, route}){
    const{item} = route.params;
    //const txSummary = item.txSummary;
    const[transactions, setTransactions] = useState([]);
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/968-loading.json'));
    const[progress, setProgress] = useState(0);

    const ChangeAnimation = (url) => {
        setLoadingAnimation(url);
        setProgress(0);
    }

    useLayoutEffect(() => {
        let loading = true;

        if(loading){
            if(item.hasOwnProperty('txSummary')){
                setTransactions(item.txSummary);
            }else{
                setTransactions([]);
                Alert.alert(
                    'Failed',
                    'This is the genesis block. It has no transactions',
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                ChangeAnimation(require('../assets/lottie/4958-404-not-found.json'));
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }
        }

        return () => {
            loading = false;
        };
    },[item]);

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    if(transactions.length === 0){
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
                data={transactions}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.item}>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text>Id: {item._id}</Text>
                            <Text>Timestamp: {item.createdAt}</Text>
                            <Text>Creator: {item.user}</Text>
                            <View>
                                <Text>Latitude: {item.location.latitude}</Text>
                                <Text>Longitude: {item.location.longitude}</Text>
                            </View>
                            <Text>Hash: {item.hash}</Text>
                        </View>
                    </TouchableOpacity> 
                } 
                keyExtractor={(item) => item._id}
                />
            </View>
        )
    }
}