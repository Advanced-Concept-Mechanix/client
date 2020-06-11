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
import getData from '../functions/getData';
import hash from '../functions/hash';

export default function updatePassword({ navigation, route }){

    const user = global.User;
    //const[user, setUser] = useState(null);
    const[password, setPassword] = useState('');
    const[question, setQuestion] = useState('');
    const[answer, setAnswer] = useState('');
    const[currentAnswer, setCurrentAnswer] = useState(null);
    const[permission, setPermission] = useState(false);
    const[emailPermission, setEmailPermission] = useState(false);
    const[email, setEmail]= useState(null);

    // useEffect(() => {
    //     let loading = true;

    //     async function getQuestion(){
    //         await store('security')
    //         .then((securityQuestion) => {
    //             if(!securityQuestion){
    //                 alert('No security question found');
    //             }else{
    //                 setQuestion(securityQuestion.question);
    //             }
    //         });
    //     }

    //     if(loading){
    //         //console.log(getFetchUrl());
    //         //getQuestion();
    //     }

    //     return () => {
    //         loading = false;
    //     };
    // }, []);

    const getQuestion = async() => {
        await getData(`http://62.171.181.137/users/question/${email}`)
        .then(async(response) => {
            if(response.ok){
                let data = await response.json();
                console.log('Success:', data);
                setQuestion(data.user.question);
                setAnswer(data.user.answer);
                setEmailPermission(true);
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
    }

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

    const updatePerm = async () => {
        let newAnswer = await hash(currentAnswer);
        if(newAnswer !== answer){
            alert('Please set the correct answer');
        }else{
            setPermission(true);
        } 
    }

    const registerUpdate = async () => {

        if(password){
            if(email){
                let updatedPassword = {
                    password:password
                };
                const url = 'http://62.171.181.137/users/password/' + email;
                console.log(url);

                await postData('http://62.171.181.137/users/password/' + email, updatedPassword)
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
                alert("Please fill email");
            }
        }else{
            alert("Please fill password");
        }
    }

    if(emailPermission === false){
        return(
            <View style={styles.container}>
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                    <MyTextInput
                    placeholder="Enter email"
                    onChangeText={(email) => setEmail(email)}
                    />
                    <MyButton
                    title="Set Email"
                    customClick={getQuestion}
                    />
                </View>
            </View>
        );
    }

    else if(permission === false){
        return(
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center'}}>
                    <Text>{question}</Text>
                    <MyTextInput
                    placeholder="Enter Answer"
                    onChangeText={(answer) => setCurrentAnswer(answer.toLowerCase())}
                    />
                    <MyButton
                    title="Check"
                    customClick={updatePerm}
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
                    <MyTextInput
                    placeholder="Enter new password"
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