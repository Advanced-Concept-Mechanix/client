import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import styles from './style';
import logo from '../assets/logo.png';
import strings from '../config/strings';
import Mytextinput from '../components/mytextinput';
import Mybutton from '../components/mybutton';
import postData from '../functions/postData';
import store from '../functions/store';
  

export default function login({ navigation }){

    const url = 'http://62.171.181.137/users/login';

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[emailTouched, setEmailTouched] = useState(false);
    const[passwordTouched, setPasswordTouched] = useState(false);

    passwordInputRef = useRef();

    const handleEmailSubmit = () => {
        // if (passwordInputRef.current) {
        //     passwordInputRef.current.focus();
        // }
        passwordInputRef.current.focus();
    }

    const storeUser = async (data) => {
      let wallet = {
        id:data.user._id,
        publicKey:data.user.publicKey,
        secretKey:data.user.secretKey,
        name:data.user.name,
        phone:data.user.phone,
        email:data.user.email,
        company:data.user.company,
        type:data.user.type
      };
      let id = data.user._id;

      await store('user', wallet);
    }

    const handleLogin = async () => {
        console.log("Login button pressed");
        if(email){
          if(password){
            let loginDetails = {
              email:email,
              password:password
            };

            await postData(url, loginDetails)
            .then(async (response) => {
              if(response.ok){
                let data = await response.json();
                //console.log('Success:', data);
                storeUser(data);
                // storeUser(data).then(() => navigation.navigate('scan'));
              }else{
                let data = await response.json();
                console.log('Failure:', data);
                Alert.alert(
                    'Failure',
                    'Login Failed',
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
        }else{
          alert("Please fill email");
        }
    }

    const handleEmailBlur = () => {
      setEmailTouched(true);
    };
  
    const handlePasswordBlur = () => {
      setPasswordTouched(true);
    };

    const emailError =
      !email && emailTouched
        ? strings.EMAIL_REQUIRED
        : undefined;
    const passwordError =
      !password && passwordTouched
        ? strings.PASSWORD_REQUIRED
        : undefined;

    return(
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <View style={styles.form}>
                <Mytextinput
                value={email}
                placeholder={strings.EMAIL_PLACEHOLDER}
                onChangeText={(email) => setEmail(email)}
                onSubmitEditing={handleEmailSubmit}
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onBlur={handleEmailBlur}
                error={emailError}
                />
                <Mytextinput
                ref={passwordInputRef}
                value={password}
                placeholder={strings.PASSWORD_PLACEHOLDER}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
                returnKeyType="done"
                onBlur={handlePasswordBlur}
                error={passwordError}
                />
                <Mybutton
                title={strings.LOGIN}
                customClick={handleLogin}
                disabled={!email || !password}
                />
                <Mybutton
                title='Forgot Password'
                customClick={() => navigation.navigate('updatePassword',)}
                />
                <Mybutton
                title='Sign Up'
                customClick={() => navigation.navigate('newUser',)}
                />
            </View>
        </View>
    );
}