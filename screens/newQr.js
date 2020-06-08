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
import styles from './style';
import QRCode from 'react-native-qrcode-svg';
import Mytextinput from '../components/mytextinput';
import Mybutton from '../components/mybutton';
import hash from '../functions/hash';
import postData from '../functions/postData';
import convertNum from '../functions/convertNumToString';

function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}

export default function createQr({ route }){

    const{item} = route.params;
    const url = 'http://62.171.181.137/createProducts/new';
    const[qrNum, setQrNum] = useState(0);
    const[qrList, setQrList] = useState([]);
    const[qrSize, setQrSize] = useState(200);
    const qrDataSet = [];

    const getQrData = async() => {
        if(qrNum === 0){
            alert('Please set a number!');
        }
        let count = 0;
        for(i = 1; i <= qrNum; i++){
            //let randomString = await generateRandomString();
            // let randomNum = Math.floor((Math.random()*100000000) + 1);
            let randomNum = Math.random();
            let randomString = convertNum(randomNum);
            // console.log(`randomNum: ${randomNum}`);
            // console.log(`randomString: ${randomString}`);
            let _qrdata = {
                profileId:item._id,
                name:item.name,
                description:item.description,
                manufacturer:item.manufacturer,
                dateOfManufacture:new Date(),
                dateOfExpiry: addDays(item.daysBeforeExpiry),
                UUID:await hash(item._id + item.manufacturer + randomString),
                nonce:randomNum.toString().slice(2)
            }
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

    if(qrList.length === 0){
        return(
            <View style={styles.container}>
                <Mytextinput
                placeholder={'Enter number of qr codes'}
                keyboardType="numeric"
                onChangeText={(qrNum) => setQrNum(qrNum)}
                />
                <Mybutton
                title='Generate Data'
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
            </View>
        );
    }
}

// useEffect(() => {

    //     getDataURL();

    // }, [getDataURL]);

    // // const print = () => {
    // //     Print.printAsync({
    // //       html: `
    // //          <img src="data:image/jpeg;base64,${qrData}"/>
    // //        `
    // //     });
    // // }

    // const getDataURL = () => {

    //     svg.toDataURL(callback);

    // }


    // const callback = (dataURL) => {

    //     console.log(dataURL);
    //     setQrData(dataURL);

    // }

    // export default function createQr({ route }){

    //     const{item} = route.params;
    //     const url = 'http://62.171.181.137/createProducts/new';
    //     console.log(item);
    //     const[qrText, setQrText] = useState('change me');
    //     const[qrTextHolder, setQrTextHolder] = useState('');
    //     const[qrNum, setQrNum] = useState(0);
    //     const[qrList, setQrList] = useState([]);
    //     const[qrSize, setQrSize] = useState(200);
    //     // const[qrData, setQrData] = useState([]);
    //     const qrDataSet = [];
    
    //     const getQrData = async() => {
    //         if(qrNum === 0){
    //             alert('Please set a number!');
    //         }
    //         let count = 0;
    //         //setUpdate(true);
    //         for(i = 1; i <= qrNum; i++){
    //             //let _qrdata = new QrData(item);
    //             let randomNumString = Math.floor((Math.random()*100000000) + 1).toString();
    //             let _qrdata = {
    //                 profileId:item._id,
    //                 name:item.name,
    //                 description:item.description,
    //                 manufacturer:item.manufacturer,
    //                 dateOfManufacture:new Date(),
    //                 dateOfExpiry: addDays(item.daysBeforeExpiry),
    //                 UUID:await hash(item._id + item.manufacturer + new Date() + randomNumString)
    //             }
    //             await postData(url, _qrdata)
    //             .then(async(response) => {
    //                 if(response.ok){
    //                     count++;
    //                     let data = await response.json();
    //                     console.log('Success:', data);
    //                 }else{
    //                     let data = await response.json();
    //                     console.log('Failure:', data);
    //                     Alert.alert(
    //                         'Failure',
    //                         data.message,
    //                         [
    //                             {
    //                                 text: 'Ok',
    //                                 //onPress: () => navigation.navigate('login'),
    //                             },
    //                         ],
    //                         { cancelable: false }
    //                     );
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             });
    //             qrDataSet.push(_qrdata);
    //         }
    //         // console.log(qrDataSet);
    //         // console.log(`data length: ${qrDataSet.length}`);
    //         // console.log(`qrNum: ${qrNum}`);
    //         // console.log((qrDataSet.length == qrNum).toString());
    //         // console.log(typeof qrDataSet.length + ' ' + typeof qrNum);
    //         if(count == qrNum){
    //             setQrList([...qrDataSet]);
    //             console.log(qrDataSet);
    //             Alert.alert(
    //                 'Success',
    //                 'Qr data successfully added',
    //                 [
    //                     {
    //                         text: 'Ok',
    //                         onPress: () => qrDataSet.length =  0,
    //                     },
    //                 ],
    //                 { cancelable: false }
    //             );
    //         }else{
    //             qrDataSet.length =  0;
    //             alert('Products were not added!');
    //         }
            
    //     }
    
    //     const handleChange = () => {
    
    //         setQrText(qrTextHolder);
    
    //     }
    
    //     ListViewItemSeparator = () => {
    //         return (
    //             <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
    //         );
    //     };
    
    //     if(qrList.length === 0){
    //         return(
    //             <View style={styles.container}>
    //                 <QRCode 
    //                     value={qrText}
    //                     logo={require('../assets/logo.png')}
    //                     ecl='H'
    //                     getRef={(c) => svg = c}
    //                 />
    //                 <Mytextinput
    //                 value={qrTextHolder}
    //                 placeholder={'Enter text for Qr code'}
    //                 //onChangeText={(qrText) => setQrText(qrText)}
    //                 onChangeText={(qrTextHolder) => setQrTextHolder(qrTextHolder)}
    //                 />
    //                 <Mybutton
    //                 title='Create'
    //                 customClick={handleChange}
    //                 />
    //                 <Mytextinput
    //                 placeholder={'Enter number of qr codes'}
    //                 keyboardType="numeric"
    //                 onChangeText={(qrNum) => setQrNum(qrNum)}
    //                 />
    //                 <Mybutton
    //                 title='Generate Data'
    //                 customClick={getQrData}
    //                 />
    //                 {/* <Mybutton
    //                 title='Print'
    //                 customClick={print}
    //                 /> */}
    //             </View>
    //         );
    //     }else{
    //         return(
    //             <View style={styles.container}>
    //                 <Text>List of QR Codes</Text>
    //                 <FlatList 
    //                 data={qrList}
    //                 ItemSeparatorComponent={ListViewItemSeparator}
    //                 renderItem={({ item }) =>
    //                     <TouchableOpacity>
    //                         <View style={{ backgroundColor: 'white', padding: 20 }}>
    //                             <QRCode 
    //                                 value={JSON.stringify(item)}
    //                                 //logo={require('../assets/logo.png')}
    //                                 ecl='M'
    //                                 size={qrSize}
    //                             />
    //                         </View>
    //                     </TouchableOpacity> 
    //                 } 
    //                 keyExtractor={(item) => item.UUID}
    //                 />
    //             </View>
    //         );
    //     }
    // }