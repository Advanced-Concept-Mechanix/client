import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  Picker,
  ScrollView,
  KeyboardAvoidingView, 
  Alert
} from 'react-native';
import MyText from '../components/mytext';
import MyButton from '../components/mybutton';
import MyTextInput from '../components/mytextinput';
import styles from './style';
import postData from '../functions/postData';
import store from '../functions/store';

export default function updateProduct({ navigation, route }){

    const {product} = route.params;
    const[url, setUrl] = useState('');
    const[name, setName] = useState('');
    const[description, setDescription] = useState([]);
    const[manufacturer, setManufacturer] = useState('');
    const[daysBeforeExpiry, setDaysBeforeExpiry] = useState(0);

    useEffect(() => {
        let loading = true;

        function getFetchUrl(){
            return 'http://62.171.181.137/products/update/' + product._id;
        }

        async function fetchUser(){
            return await store('user');
        }

        fetchUser()
        .then(async(user)=> {
            if(loading){
                setManufacturer(user.id);
                setUrl(getFetchUrl());
            }
        });

        return () => {
            loading = false;
        };
    }, [product]);

    const registerUpdate = async () => {

        if(name){
            if(description){
                if(manufacturer){
                    if(daysBeforeExpiry){
                        let updatedProduct = {
                            name:name,
                            description:description,
                            manufacturer:manufacturer,
                            daysBeforeExpiry:daysBeforeExpiry,
                        };
                        //console.log(updatedUser)

                        await postData(url, updatedProduct)
                            .then(async (response) => {
                                if(response.ok){
                                    let data = await response.json();
                                    console.log('Success:', data);
                                    Alert.alert(
                                        'Success',
                                        'Product updated successfully',
                                        [
                                            {
                                                text: 'Ok',
                                                onPress: () => navigation.navigate('myProducts'),
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                                }else{
                                    let data = await response.json();
                                    console.log('Failure:', data);
                                    Alert.alert(
                                        'Failure',
                                        data.message,
                                        [
                                            {
                                                text: 'Ok',
                                                //onPress: () => navigation.navigate('Scan'),
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    }else{
                        alert("Please fill days before expiry");
                    }
                }else{
                    alert("Please fill manufacturer");
                }
            }else{
                alert("Please fill description");
            }
        }else{
            alert("Please fill name");
        }
    }

    return(
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                    <MyText text='Enter Details to Update Product'/>
                    <MyTextInput
                    placeholder="Enter name"
                    onChangeText={(name) => setName(name)}
                    />
                    <MyTextInput
                    placeholder="Enter description"
                    onChangeText={(description) => setDescription(description)}
                    />
                     <MyTextInput
                    placeholder="Enter number of days before expiry"
                    onChangeText={(daysBeforeExpiry) => setDaysBeforeExpiry(daysBeforeExpiry)}
                    keyboardType="numeric"
                    />
                    <MyButton
                    title="Update"
                    customClick={registerUpdate}
                    />
                    <MyButton
                    title="Go Back"
                    customClick={() => navigation.goBack()}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}