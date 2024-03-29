import React, { useState, useEffect, useRef} from 'react';
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
import * as Sharing from 'expo-sharing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import LottieView from 'lottie-react-native';
import styles from './style';
import QRCode from 'react-native-qrcode-svg';
import Mytextinput from '../components/mytextinput';
import Mybutton from '../components/mybutton';
import hash from '../functions/hash';
import postData from '../functions/postData';
import convertNum from '../functions/convertNumToString';
import addDays from '../functions/addDays';
import getData from '../functions/getData';
import QrCode from '../components/qrcode';
import toPdf from '../functions/pdfConverter';
import RNImageToPdf from 'react-native-image-to-pdf';
import metrics from '../config/metrics';

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
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/968-loading.json'));
    const[constructionAnimation, setConstructionAnimation] = useState(require('../assets/lottie/1012-construction-site.json'));
    const[progress, setProgress] = useState(0);
    const[constructionProgress, setConstructionProgress] = useState(0);
    const[construction, setConstruction] = useState(false);

    //qr config
    const[size, setSize] = useState(200);
    const[ecl, setEcl] = useState('M');
    const[color, setColor] = useState('black');
    const[backgroundColor, setBackgroundColor] = useState('white');
    const[linearGradient, setLinearGradient] = useState(['rgb(255,0,0)','rgb(0,255,255)']);
    const[enableLinearGradient, setEnableLinearGradient] = useState(false);
    const[quietZone, setQuietZone] = useState(0);
    const[imageSource, setImageSource] = useState(require('../assets/logo.png'));
    const pdfArr = [];

    //svg ref
    var svg;

    //function for adding qrcode to array
    const addToArray = async(dataURL) => {
        pdfArr.push(`data:image/png;base64,${dataURL}`);
        console.log(`image added to array!`);
        //console.log(`pdfArr:${pdfArr}`);
    }

    //convert the array to a pdf
    // const convertArrtoPdf = async() => {
    //     await toPdf(pdfArr)
    //     .then((pdf) => {
    //         console.log("pdf ", pdf);
    //     })
    // }

    const myAsyncPDFFunction = async () => {
        try {
            const options = {
                imagePaths: pdfArr,
                name: 'PDFName',
                maxSize: { // optional maximum image dimension - larger images will be resized
                    width: 900,
                    height: Math.round(metrics.DEVICE_HEIGHT / metrics.DEVICE_WIDTH * 900),
                },
                quality: .7, // optional compression paramter
            };
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            
            console.log(pdf.filePath);
        } catch(e) {
            console.log(e);
        }
    }

    const share = async(dataURL) => {
        await Sharing.shareAsync(`data:image/png;base64,${dataURL}`);
    }

    const getDataURL = () => {
        svg.toDataURL(addToArray);
    }

    const ChangeAnimation = (url) => {
        setLoadingAnimation(url);
        setProgress(0);
    }

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
                        ChangeAnimation(require('../assets/lottie/4958-404-not-found.json'));
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
                        onPress: () => {
                            qrDataSet.length =  0;
                            setConstruction(false);
                        },
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

    const qrStringify = (arr) => {
        let newArr = [];
        arr.forEach((el) => {
            let str = JSON.stringify(el);
            newArr.push(str);
        })
        return newArr;
    }

    if(products.length === 0){
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
    }else if(qrList.length === 0){
        if(!construction){
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
                    customClick={() => {
                        setConstruction(true);
                        getQrData();
                    }}
                    />
                </View>
            );
        }else{
            return(
                <View style={styles.containerDark}>
                    <LottieView 
                        speed={1}
                        source={constructionAnimation}
                        style={styles.lottie}
                        loop={true}
                        autoPlay={true}
                        progress={constructionProgress}
                    >
                    </LottieView>
                </View>
            );
        }
        
    }else{
        if(construction){
            return(
                <View style={styles.containerDark}>
                    <LottieView 
                        speed={1}
                        source={constructionAnimation}
                        style={styles.lottie}
                        loop={true}
                        autoPlay={true}
                        progress={constructionProgress}
                    >
                    </LottieView>
                </View>
            );
        }
        return(
            <View style={styles.container}>
                <Text>List of QR Codes</Text>
                <FlatList 
                data={qrList}
                ItemSeparatorComponent={ListViewItemSeparator}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={getDataURL}>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <QRCode
                                size={size}
                                ecl={ecl}
                                color={color}
                                backgroundColor={backgroundColor}
                                linearGradient={linearGradient}
                                enableLinearGradient={enableLinearGradient}
                                quietZone={quietZone}
                                imageSource={imageSource}
                                getRef={c => svg=c} 
                                value={JSON.stringify(item)}
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
                <Mybutton
                title='Convert to Pdf'
                customClick={myAsyncPDFFunction}
                />
            </View>
        );
    }
}

