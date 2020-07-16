import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './style';
import isEmpty from '../functions/isEmpty';
import store from '../functions/store';
import hash from '../functions/hash';
import Mybutton from '../components/mybutton';

export default function userDetails({ navigation }){
    const user = global.User;
    const[publicKey, setPublicKey] = useState('');
    const[secretKey, setSecretKey] = useState('');
    const[loadingText, setLoadingText] = useState('Loading User Details...');
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/968-loading.json'));
    const[progress, setProgress] = useState(0);

    const ChangeAnimation = (url) => {
        setLoadingAnimation(url);
        setProgress(0);
    }

    useEffect(() => {
        let loading = true;

        (async()=> {
            if(loading){
                if(!user){
                    ChangeAnimation(require('../assets/lottie/4958-404-not-found.json'));
                }
                else{
                    let public_key = await hash(JSON.stringify(user.publicKey));
                    let secret_key = await hash(JSON.stringify(user.secretKey));
                    //console.log(user);
                    setPublicKey(public_key);
                    setSecretKey(secret_key);
                }
            }
        })();

        return () => {
            loading = false;
        };
    },[]);

    const logout = async () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to logout?',
            [
            {
                text: 'Ok',
                onPress: async() => {
                    await store('user', 'delete')
                    .then(() => {
                        Alert.alert(
                            'Success',
                            'User logged out successfully',
                            [
                            {
                                text: 'Ok',
                                //onPress: () => navigation.navigate('Scan'),
                            },
                            ],
                            { cancelable: false }
                        );
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                },
            },
            {
                text: 'Cancel',
                style: 'cancel'
            },
            ],
            { cancelable: false }
        );
    }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    if(isEmpty(user) && publicKey.length === 0 && secretKey.length === 0){
        return(
            <View style={styles.containerDark}>
                <LottieView 
                    speed={1}
                    source={loadingAnimation}
                    style={styles.lottie}
                    loop={true}
                    autoPlay={true}
                    progress={progress}
                >
                </LottieView>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <Text>Id: {user.id}</Text>
                        <Text>Name: {user.name}</Text>
                        <Text>Email: {user.email}</Text>
                        <Text>Phone: {user.phone}</Text>
                        <Text>Company: {user.company}</Text>
                        <Text>Type: {user.type}</Text>
                        <Text>Public Key: {publicKey}</Text>
                        <Text>Secret Key: {secretKey}</Text>
                        <Mybutton
                        title='Update User'
                        customClick={() => navigation.navigate('updateUser')}
                        />
                        <Mybutton
                        title='logout'
                        customClick={logout}
                        />
                    </View>
                </TouchableOpacity> 
            </View>
        )
    }
}