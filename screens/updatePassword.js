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

export default function updatePassword({ navigation, route }){

    const user = global.User;
    //const[user, setUser] = useState(null);
    const[url, setUrl] = useState('');
    const[password, setPassword] = useState('');
    const[question, setQuestion] = useState('');
    const[answer, setAnswer] = useState('');
    const[permission, setPermission] = useState(false);

    useEffect(() => {
        let loading = true;

        function getFetchUrl(){
            return 'http://62.171.181.137/users/password/' + user.id;
        }

        async function getQuestion(){
            await store('security')
            .then((securityQuestion) => {
                if(!securityQuestion){
                    alert('No security question found');
                }else{
                    setQuestion(securityQuestion.question);
                }
            });
        }

        if(loading){
            //console.log(getFetchUrl());
            getQuestion()
            .then(() => setUrl(getFetchUrl()));
        }

        return () => {
            loading = false;
        };
    }, [user]);

    const updatePermission = async () => {
        await store('security')
        .then((securityQuestion) => {
            if(securityQuestion.answer !== answer){
                alert('Please set the correct answer');
            }else{
                setPermission(true);
            }
        })
    }

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
                                    onPress: () => navigation.navigate('login'),
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

    if(permission === false){
        return(
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center'}}>
                    <Text>{question}</Text>
                    <MyTextInput
                    placeholder="Enter Answer"
                    onChangeText={(answer) => setAnswer(answer.toLowerCase())}
                    />
                    <MyButton
                    title="Check"
                    customClick={updatePermission}
                    />
                    <MyButton
                    title="Go Back"
                    customClick={() => navigation.goBack()}
                    />
                </View>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                    <View style={{ flex: 1, justifyContent: 'center'}}>
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
                </View>
            </View>
        );
    }
}