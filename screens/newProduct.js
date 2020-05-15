import React, {useState} from 'react';
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

export default function newProduct({ navigation }){

    const[name, setName] = useState('');
    const[description, setDescription] = useState([]);
    const[manufacturer, setManufacturer] = useState('');
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
                
                        await fetch('http://62.171.181.137/products/new', {
                            method: 'POST', // or 'PUT'
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(product),
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Success:', data);
                                Alert.alert(
                                    'Success',
                                    'You are registered successfully',
                                    [
                                      {
                                        text: 'Ok',
                                        onPress: () => navigation.navigate('Scan'),
                                      },
                                    ],
                                    { cancelable: false }
                                );
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });

                    }else{
                        alert('Please fill days before expiry');
                    }
                }else{
                    alert('Please fill manufacturer'); 
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
                    <MyText>Enter Details to Create Product</MyText>
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
                    <MyTextInput
                    placeholder="Enter manufacturer"
                    onChangeText={(manufacturer) => setManufacturer(manufacturer)}
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