import React, { useState, useEffect} from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    TextInput,
    Image,
    Alert,
    KeyboardAvoidingView,
    FlatList
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './style';
import QRCode from 'react-native-qrcode-svg';
import Mytextinput from '../components/mytextinput';
import Mybutton from '../components/mybutton';
import hash from '../functions/hash';
import postData from '../functions/postData';
import convertNum from '../functions/convertNumToString';
import addDays from '../functions/addDays';
import getData from '../functions/getData';

export default function createQr({ route }){

    const url = 'http://62.171.181.137/createProducts/new';
    const[qrNum, setQrNum] = useState(0);
    const[qrList, setQrList] = useState([]);
    const[qrSize, setQrSize] = useState(200);
    const qrDataSet = [];

    const user = global.User;
    const[products, setProducts] = useState([]);
    const[loadingText, setLoadingText] = useState('Loading products...');
    const[selectedProduct, setSelectedProduct] = useState(null);

    //usEffect to get url and fetch products
    useEffect(() => {

        let loading = true;

        async function fetchData(){
            await getData(`http://62.171.181.137/products/${user.id}`)
            .then(async(response) => {
                if(response.ok){
                    //console.log(response);
                    let data = await response.json();
                    //console.log(data);
                    if(data.products.length === 0){
                        setLoadingText('No Products Found!');
                    }

                    if(loading){
                        //console.log(data.products);
                        // let productArr = [
                        //     {
                        //         label:"Please select a profile",
                        //         value:"Select Profile",
                        //         selected: true,
                        //         disabled: true
                        //     }
                        // ];
                        let productArr = [];
                        for(i=0;i<data.products.length;i++){
                            let itemObj = {
                                label:data.products[i].name,
                                value:data.products[i]
                            }
                            productArr.push(itemObj);
                        }
                        //console.log(productArr);
                        setProducts(productArr);
                    }
                }else{
                    let data = await response.json();
                    console.log('Failure: ', data);
                    Alert.alert(
                        'Failed',
                        data.message,
                        [
                            {
                                text: 'Ok'
                            },
                        ],
                        { cancelable: false }
                    );
                }
            })
        }

        fetchData();

        return () => {
            loading = false;
        };
    }, [user]);


    const getQrData = async() => {
        if(qrNum === 0){
            alert('Please set a number!');
        }
        let count = 0;
        for(i = 1; i <= qrNum; i++){
            let randomNum = Math.random();
            let randomString = convertNum(randomNum);
            let _qrdata = {
                profileId:selectedProduct._id,
                name:selectedProduct.name,
                description:selectedProduct.description,
                manufacturer:selectedProduct.manufacturer,
                dateOfManufacture:new Date(),
                dateOfExpiry: addDays(selectedProduct.daysBeforeExpiry),
                UUID:await hash(selectedProduct._id + selectedProduct.manufacturer + randomString),
                nonce:randomNum.toString().slice(2)
            }
            console.log(_qrdata);
            await postData(url, _qrdata)
            .then(async(response) => {
                if(response.ok){
                    count++;
                    let data = await response.json();
                    //console.log('Success:', data);
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
            qrDataSet.push(_qrdata);
        }
        if(count == qrNum){
            setQrList([...qrDataSet]);
            console.log(qrDataSet);
            Alert.alert(
                'Success',
                'Qr data successfully added',
                [
                    {
                        text: 'Ok',
                        onPress: () => qrDataSet.length =  0,
                    },
                ],
                { cancelable: false }
            );
        }else{
            qrDataSet.length =  0;
            alert('Products were not added!');
        }
        
    }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    if(products.length === 0){
        return(
            <View style={styles.container}>
                <Text>{loadingText}</Text>
            </View>
        );
    }else if(qrList.length === 0){
        return(
            <View style={styles.container}>
                <DropDownPicker
                    defaultValue={selectedProduct}
                    placeholder="Select a Profile"
                    items={products}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setSelectedProduct(item.value)}
                    searchable={true}
                    searchablePlaceholder="Search..."
                    searchableError="Not Found"
                />
                <Mytextinput
                placeholder={'Enter number of qr codes'}
                keyboardType="numeric"
                onChangeText={(qrNum) => setQrNum(qrNum)}
                />
                <Mybutton
                title='Create'
                customClick={getQrData}
                />
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <Text>List of QR Codes</Text>
                <FlatList 
                data={qrList}
                ItemSeparatorComponent={ListViewItemSeparator}
                renderItem={({ item }) =>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <QRCode 
                                value={JSON.stringify(item)}
                                //logo={require('../assets/logo.png')}
                                ecl='M'
                                size={qrSize}
                            />
                        </View>
                    </TouchableOpacity> 
                } 
                keyExtractor={(item) => item.UUID}
                />
                <Mybutton
                title='Create Again'
                customClick={() => {
                    setQrList([]);
                    setSelectedProduct(null);
                }
                }
                />
            </View>
        );
    }
}

