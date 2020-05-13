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

export default function newUser(){

    const[name, setName] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');
    const[phone, setPhone] = useState(0);
    const[company, setCompany] = useState('');
    const[type, setType] = useState('manufacturer');

    const registerUser = async () => {
        let user = {
            name:name,
            password:password,
            email:email,
            phone:phone,
            company:company,
            type:type
        };

        await fetch('http://localhost:5000/users/new/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        console.log(user);
    }

    return(
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                    <MyText>Enter Details to Create Account</MyText>
                    <MyTextInput
                    placeholder="Enter name"
                    onChangeText={(name) => setName(name)}
                    />
                    <MyTextInput
                    placeholder="Enter email address"
                    onChangeText={(email) => setEmail(email)}
                    />
                     <MyTextInput
                    placeholder="Enter phone number"
                    onChangeText={(phone) => setPhone(phone)}
                    maxLength={10}
                    keyboardType="numeric"
                    />
                    <MyTextInput
                    placeholder="Enter password"
                    onChangeText={(password) => setPassword(password)}
                    minLength={6}
                    />
                    <MyTextInput
                    placeholder="Enter the name of your company"
                    onChangeText={(company) => setCompany(company)}
                    />
                    <Picker
                    type={type}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                    >
                        <Picker.Item label="Manufacturer" value="manufacturer" />
                        <Picker.Item label="Distributor" value="distributor" />
                        <Picker.Item label="Retailer" value="retailer" />
                        <Picker.Item label="End-User" value="end-user" />
                    </Picker>
                    <MyButton
                    title="Create"
                    customClick={registerUser}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}