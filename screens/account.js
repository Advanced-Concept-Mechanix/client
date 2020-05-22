import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import styles from './style';
import isEmpty from '../functions/isEmpty';
import store from '../functions/store';

export default function account(){

    const[user, setUser] = useState({});

    useEffect(() => {
        let loading = true;

        async function fetchUser(){
            return await store('user');
        }

        fetchUser()
        .then(async(user)=> {
            if(loading){
                console.log(user);
                setUser(user);
            }
        });

        return () => {
            loading = false;
        };
    },[]);

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    if(isEmpty(user)){
        return(
            <View style={styles.container}>
                <Text>Loading User Details</Text>
            </View>
        )
    }else{
        return(
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <Text>Id: {user.id}</Text>
                        <Text>Public Key: {Object.entries(user.publicKey)}</Text>
                        <Text>Secret Key: {Object.entries(user.secretKey)}</Text>
                    </View>
                </TouchableOpacity> 
            </View>
        )
    }
}