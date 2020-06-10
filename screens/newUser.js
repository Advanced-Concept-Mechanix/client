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
import postData from '../functions/postData';
import store from '../functions/store';
import MyDropDown from '../components/myDropDown'
import DropDownPicker from 'react-native-dropdown-picker';
import { set } from 'react-native-reanimated';
import metrics from '../config/metrics';

export default function newUser({ navigation }){

    const TYPES = [
        {
            "label":'Manufacturer',
            "value":'manufacturer'
        },
        {
            "label":'Distributor',
            "value":'distributor'
        },
        {
            "label":'Retailer',
            "value":'retailer'
        },
        {
            "label":'End-User',
            "value":'end-user'
        }
    ];

    const QUESTIONS = [
        {
            "label":"What was your childhood nickname?",
            "value":"What was your childhood nickname?"
        },
        {
            "label":"What is the name of your favorite childhood friend?",
            "value":"What is the name of your favorite childhood friend?"
        },
        {
            "label":"What is your oldest sibling's middle name?",
            "value":"What is your oldest sibling's middle name?"
        },
        {
            "label":"What is your oldest cousin's first name?",
            "value":"What is your oldest cousin's first name?"
        },
        {
            "label":"Which high school did you attend?",
            "value":"Which high school did you attend?"
        },
        {
            "label":"What is your maternal grandmother's maiden name?",
            "value":"What is your maternal grandmother's maiden name?"
        },
        {
            "label":"What was the name of your elementary / primary school?",
            "value":"What was the name of your elementary / primary school?"
        },
    ]
    //console.log(TYPES);

    const[name, setName] = useState(null);
    const[password, setPassword] = useState(null);
    const[email, setEmail] = useState(null);
    const[phone, setPhone] = useState(null);
    const[company, setCompany] = useState(null);
    const[type, setType] = useState(null);
    const[question, setQuestion] = useState(null);
    const[answer, setAnswer] = useState(null);
    const[next, setNext] = useState(null);

    const clearState = () => {
        setName('')
        setEmail('')
        setPassword('')
        setPhone(0)
        setCompany('')
        setType('manufacturer')
    }

    const storeSecurity = async () => {
        let securityQuestion = {
            question:question,
            answer:answer}
        return await store('security', securityQuestion);
    }

    const registerUser = async () => {

        if(name){
            if(password){
                if(email){
                    if(phone){
                        if(company){
                            if(type){
                                if(question){
                                    if(answer){
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
                                                    await storeSecurity();
                                                    let data = await response.json();
                                                    console.log('Success:', data);
                                                    Alert.alert(
                                                        'Success',
                                                        data.msg,
                                                        [
                                                            {
                                                                text: 'Ok',
                                                                //onPress: () => clearState(),
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
                                                                //onPress: () => navigation.navigate('login'),
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
                                            alert("Please fill answer");
                                        }
                                    }else{
                                        alert("Please fill question");
                                    }
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

    if(!next){
        return(
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <MyText text="Account Details" style={{ zIndex: 1 }}/>
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
                    <MyButton
                    title="Next"
                    customClick={() => setNext(true)}
                    />
                </View>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <View style={{ flex: 10, justifyContent: 'space-around' }}>
                    <MyText text="Type and Password Settings"/>
                    <DropDownPicker 
                        defaultValue={type}
                        placeholder="Select a Type"
                        items={TYPES}
                        onChangeItem={item => {
                            console.log(item.value);
                            setType(item.value);
                            }
                        }
                        containerStyle={{
                            height: 40,
                            width: metrics.DEVICE_WIDTH * 0.8,
                            alignItems: 'center'
                        }}
                        style={{backgroundColor: '#fafafa'}}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        disabled={false}
                        zIndex={2}
                    />
                    <DropDownPicker 
                        defaultValue={question}
                        placeholder="Select a Question"
                        items={QUESTIONS}
                        onChangeItem={item => {
                            console.log(item.value);
                            setQuestion(item.value);
                            }
                        }
                        containerStyle={{
                            height: 80,
                            width: metrics.DEVICE_WIDTH * 0.8
                        }}
                        style={{backgroundColor: '#fafafa'}}
                        dropDownStyle={{
                            backgroundColor: '#fafafa',
                            marginTop: 2,
                            alignItems: 'center',
                            height: metrics.DEVICE_HEIGHT * 0.5
                        }}
                        disabled={false}
                        zIndex={1}
                    />
                    <MyTextInput
                        placeholder="Enter the answer"
                        onChangeText={(answer) => setAnswer(answer)}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MyButton
                        title="Back"
                        customClick={() => setNext(null)}
                    />
                    <MyButton
                        title="Create"
                        customClick={registerUser}
                    />
                </View>
            </View>
        );
    }
}