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

export default function updatePassword({ navigation, route }){

    const {user} = route.params;
    const[url, setUrl] = useState('');
    const[password, setPassword] = useState('');

    useEffect(() => {
        let loading = true;

        function getFetchUrl(){
            return 'http://62.171.181.137/users/password/' + user.id;
        }

        if(loading){
            //console.log(getFetchUrl());
            setUrl(getFetchUrl());
        }

        return () => {
            loading = false;
        };
    }, [user]);

    const registerUpdate = async () => {

        if(password){
            let updatedPassword = {
                password:password
            };
            //console.log(updatedUser)

            await postData(url, updatedPassword)
                .then(async (response) => {
                    if(response.ok){
                        let data = await response.json();
                        console.log('Success:', data);
                        Alert.alert(
                            'Success',
                            data.msg,
                            [
                                {
                                    text: 'Ok',
                                    //onPress: () => clearState(),
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
                alert("Please fill password");
            }
    }

    return(
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                    <MyText text="Enter Password to Update Password"/>
                    <MyTextInput
                    placeholder="Enter password"
                    onChangeText={(password) => setPassword(password)}
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