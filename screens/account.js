import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './style';
import isEmpty from '../functions/isEmpty';
import store from '../functions/store';
import hash from '../functions/hash';
import Mybutton from '../components/mybutton';

export default function account(){
    const[user, setUser] = useState({});
    const[publicKey, setPublicKey] = useState('');
    const[secretKey, setSecretKey] = useState('');
    const[loadingText, setLoadingText] = useState('Loading User Details...');

    useEffect(() => {
        let loading = true;

        async function fetchUser(){
            return await store('user');
        }

        fetchUser()
        .then(async(user)=> {
            if(loading){
                if(!user){
                    setLoadingText('No user found. Please login first');
                }
                else{
                    let public_key = await hash(JSON.stringify(user.publicKey));
                    let secret_key = await hash(JSON.stringify(user.secretKey));
                    //console.log(user);
                    setUser(user);
                    setPublicKey(public_key);
                    setSecretKey(secret_key);
                }
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

    const logout = async () => {
        await store('user', 'delete')
        .then(() => {
            Alert.alert(
                'Success',
                'User logged out successfully',
                [
                {
                    text: 'Ok',
                    //onPress: () => navigation.navigate('Scan'),
                },
                ],
                { cancelable: false }
            );
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    if(isEmpty(user) && publicKey.length === 0 && secretKey.length === 0){
        return(
            <View style={styles.container}>
                <Text>{loadingText}</Text>
            </View>
        )
    }else{
        return(
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <Text>Id: {user.id}</Text>
                        <Text>Email: {user.email}</Text>
                        <Text>Phone: {user.phone}</Text>
                        <Text>Company: {user.company}</Text>
                        <Text>Type: {user.type}</Text>
                        <Text>Public Key: {publicKey}</Text>
                        <Text>Secret Key: {secretKey}</Text>
                        <Mybutton
                        title='logout'
                        customClick={logout}
                        />
                    </View>
                </TouchableOpacity> 
            </View>
        )
    }
}