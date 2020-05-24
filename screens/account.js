import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './style';
import store from '../functions/store';
import Mybutton from '../components/mybutton';

export default function account({navigation}){

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

    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Mybutton
                    title='User Details'
                    customClick={() => navigation.navigate('UserDetails')}
                    />
                    <Mybutton
                    title='Create User'
                    customClick={() => navigation.navigate('NewUser')}
                    />
                    <Mybutton
                    title='Login'
                    customClick={() => navigation.navigate('Login')}
                    />
                    <Mybutton
                    title='logout'
                    customClick={logout}
                    />
                </View>
            </TouchableOpacity> 
        </View>
    )
}