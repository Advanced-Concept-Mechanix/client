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

export default function updateUser({ navigation, route }){

    const user = global.User;
    const[url, setUrl] = useState('');
    const[name, setName] = useState(user.name);
    const[email, setEmail] = useState(user.email);
    const[phone, setPhone] = useState(user.phone);
    const[company, setCompany] = useState(user.company);
    const[type, setType] = useState(user.type);
    const[question, setQuestion] = useState('');
    const[answer, setAnswer] = useState('');

    useEffect(() => {
        let loading = true;

        function getFetchUrl(){
            return 'http://62.171.181.137/users/update/' + user.id;
        }

        if(loading){
            //console.log(getFetchUrl());
            setUrl(getFetchUrl());
        }

        return () => {
            loading = false;
        };
    }, [user]);

    const updateLocalUser = async () => {
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.company = company;
        user.type = type;

        await store('user', user);
    }

    const registerUpdate = async () => {

        if(name){
            if(email){
                if(phone){
                    if(company){
                        if(type){
                            let updatedUser = {
                                name:name,
                                email:email,
                                phone:phone,
                                company:company,
                                type:type
                            };
                            //console.log(updatedUser)

                            await postData(url, updatedUser)
                                .then(async (response) => {
                                    if(response.ok){
                                        await updateLocalUser();
                                        console.log('Success:', data);
                                        Alert.alert(
                                            'Success',
                                            'User updated successfully',
                                            [
                                                {
                                                    text: 'Ok',
                                                    onPress: () => navigation.navigate('userDetails'),
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
            alert("Please fill name");
        }
    }

    return(
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                    <MyText text="Enter Details to Update Account"/>
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