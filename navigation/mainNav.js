import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerImage from '../components/drawerImage';
import NavigationDrawerStructure from '../components/drawerImageClass';
import store from '../functions/store';
import LottieView from 'lottie-react-native';

import accountStack from './stacks/accountStack';
import productStack from './stacks/productStack';
import blockStack from './stacks/blockStack';
import qrStack from './stacks/qrStack';
import scanStack from './stacks/scanStack';
import settings from './stacks/settings';

import AccessControl from './accessControl/accessControl';
import NoAccess from './accessControl/noAccess';
import Users from './accessControl/users';
import styles from '../screens/style';

import AdminPanel from './panels/adminPanel';
import DistributorPanel from './panels/distributorPanel';
import EndUserPanel from './panels/endUserPanel';
import GeneralPanel from './panels/generalPanel';
import ManufacturerPanel from './panels/manufacturerPanel';
import RetailerPanel from './panels/retailerPanel';

export default function mainNav(){

    const[user, setName] = useState(null);
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/968-loading.json'));
    const[progress, setProgress] = useState(0);

    const login = (user) => {
        // switch(user){
        //     case 'admin':
        //         setName(Users.admin);
        //         break;
        //     case 'manufacturer':
        //         setName(Users.manufacturer);
        //         break;
        //     case 'distributor':
        //         setName(Users.distributor);
        //         break;
        //     case 'retailer':
        //         setName(Users.retailer);
        //         break;
        //     case 'end-user':
        //         setName(Users.end-user);
        //         break;
        //     case 'other':
        //         setName(Users.other);
        //         break;
        // }
        setName(user);
    }

    //UseEffect for getting user
    useEffect(() => {
        let loading = true;

        async function fetchUser(){
            return await store('user');
        }

        if(loading){
            if(!user){
                fetchUser()
                .then((user) => {
                    if(!user){
                        Alert.alert(
                            'Login Failed',
                            'Please login first',
                            [
                                {
                                    text: 'Ok',
                                    // onPress: () => navigation.navigate('login'),
                                },
                            ],
                            { cancelable: false }
                        );
                        login('other')
                    }else{
                        login(user.type);
                        global.User = user;
                    }
                });
            }
        }

        return () => {
            loading = false;
        };
        
    }, [])

    if(!user){
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
    }
    else if(user === 'admin'){
        return(
            <AdminPanel />
        );
    }
    else if(user === 'manufacturer'){
        return(
            <ManufacturerPanel />
        );
    }
    else if(user === 'distributor'){
        return(
            <DistributorPanel />
        );
    }
    else if(user === 'retailer'){
        return(
            <RetailerPanel />
        );
    }
    else if(user === 'end-user'){
        return(
            <EndUserPanel />
        );
    }
    else if(user === 'other'){
        return(
            <GeneralPanel />
        );
    }
}