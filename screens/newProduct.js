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

export default function newProduct({ navigation }){

    const[name, setName] = useState('');
    const[description, setDescription] = useState([]);
    const[manufacturer, setManufacturer] = useState(global.User.id);
    const[daysBeforeExpiry, setDaysBeforeExpiry] = useState(0);

    const registerProduct = async () => {

        if(name){
            if(description){
                if(manufacturer){
                    if(daysBeforeExpiry){

                        let product = {
                            name:name,
                            description:description,
                            manufacturer:manufacturer,
                            daysBeforeExpiry:daysBeforeExpiry
                        }; 
                
                        await postData('http://62.171.181.137/products/new', product)
                            .then(async (response) => {
                                if(response.ok){
                                    let data = await response.json();
                                    console.log('Success:', data);
                                    const item = data.product;
                                    Alert.alert(
                                        'Success',
                                        data.msg,
                                        [
                                        {
                                            text: 'Ok',
                                            //onPress: () => navigation.navigate('singleProduct', {item:item}),
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
                        alert('Please fill days before expiry');
                    }
                }else{
                    alert('Please login first');
                }
            }else{
                alert('Please fill description'); 
            }
        }else{
            alert('Please fill name'); 
        }
    }

    return(
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                    <MyText text='Enter Details to Create Product'/>
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
                    title="Create"
                    customClick={registerProduct}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}