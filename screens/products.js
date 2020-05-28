import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './style';
import Mybutton from '../components/mybutton';
import store from '../functions/store';

export default function account({navigation}){

    const[user_id, setUserId] = useState(null);

    useEffect(() => {

        let loading = true;

        async function fetchUser(){
            return await store('user');
        }

        fetchUser()
        .then(async(user)=> {
            if(loading){
                setUserId(user.id);
            }
        });

        return () => {
            loading = false;
        };
    }, []);

    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Mybutton
                    title='My Products'
                    customClick={() => {
                        if(user_id) {
                            navigation.navigate('MyProducts', {user_id:user_id});
                        }else{
                            alert('Please login first');
                        }
                    }}
                    />
                    <Mybutton
                    title='New Product'
                    customClick={() => navigation.navigate('NewProduct')}
                    />
                </View>
            </TouchableOpacity> 
        </View>
    )
}