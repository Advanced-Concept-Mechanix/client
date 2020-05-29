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

export default function SingleProduct({navigation, route}){
    const{item} = route.params;
    //const txSummary = item.txSummary;
    const[transactions, setTransactions] = useState([]);
    const[loadingText, setLoadingText] = useState('Loading Transactions...');

    useLayoutEffect(() => {
        let loading = true;

        if(loading){
            if(item.hasOwnProperty('txSummary')){
                setTransactions(item.txSummary);
                setLoadingText('List of Transactions');
            }else{
                setTransactions([]);
                setLoadingText('No transaction found. This may be because this is the genesis transaction');;
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
            <View style={styles.container}>
                <Text>{loadingText}</Text>
                <Mybutton
                title='Go Back'
                customClick={() => navigation.goBack()}
                />
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <Text>{loadingText}</Text>
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
                <Mybutton
                title='Go Back'
                customClick={() => navigation.goBack()}
                />
            </View>
        )
    }
}