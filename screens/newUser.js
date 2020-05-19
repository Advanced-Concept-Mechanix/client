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
import postData from '../fetchFunctions/postData';

export default function newUser({ navigation }){

    const[name, setName] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');
    const[phone, setPhone] = useState(0);
    const[company, setCompany] = useState('');
    const[type, setType] = useState('manufacturer');

    const clearState = () => {
        setName('')
        setEmail('')
        setPassword('')
        setPhone(0)
        setCompany('')
        setType('manufacturer')
    }

    const registerUser = async () => {

        if(name){
            if(password){
                if(email){
                    if(phone){
                        if(company){
                            if(type){
                                let user = {
                                    name:name,
                                    password:password,
                                    email:email,
                                    phone:phone,
                                    company:company,
                                    type:type
                                };

                                await postData('http://62.171.181.137/users/new', user)
                                    .then(async (response) => {
                                        if(response.ok){
                                            let data = await response.json();
                                            console.log('Success:', data);
                                            Alert.alert(
                                                'Success',
                                                'User created successfully',
                                                [
                                                    {
                                                        text: 'Ok',
                                                        onPress: () => clearState(),
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
                                alert("Please fill type");
                            }
                        }else{
                            alert("Please fill company");
                        }
                    }else{
                        alert("Please fill phone");
                    }
                }else{
                    alert("Please fill email");
                }
            }else{
                alert("Please fill password");
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