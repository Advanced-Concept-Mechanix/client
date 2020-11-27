import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';

import styles from './style';
import Mybutton from '../components/mybutton';
import postData from '../functions/postData';

export default function cdp(){

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const camera = useRef();
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const snap = async () => {
        if (camera.current) {
            const options = { quality: 1, base64: true, skipProcessing: true };
            const data = await camera.current.takePictureAsync(options);
            //console.log(`data:image/jpg;base64,${data.base64}`)
            setImage(data.uri)
            setImageBase64(`data:image/jpg;base64,${data.base64}`);
        }
    };

    const detect = async() => {

        if(imageBase64){
            let imageData = {
                img: imageBase64
            }
            await postData('http://62.171.181.137/cdp/check', imageData)
            .then(async(response) => {
                if(response.ok){
                    let data = await response.json();
                    console.log('Success:', data);
                    Alert.alert(
                        'Success',
                        'Image Sent',
                        [
                            {
                                text: 'Ok',
                                //onPress: () => navigation.navigate('scanningNav'),
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
            alert('Please take an image first!');
        }
    }

    const onCameraReady = () => {
        setIsCameraReady(true);
    };
    
    if (hasPermission === null) {
    return <View />;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }
    if (!image){
    return (
    <View style={{ flex: 1 }}>
        <Camera 
            style={{ flex: 1 }} 
            type={type}
            flashMode={Camera.Constants.FlashMode.auto}
            autoFocus={Camera.Constants.AutoFocus.on}
            ref={camera}
            onCameraReady={onCameraReady}
            onMountError={(error) => {
                console.log("camera error", error);
                alert('Camera Error!');
            }}
        >
            {isCameraReady && <Mybutton title={'Snap'} customClick={() => snap()} />}
            <View
                style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                }}>
                <TouchableOpacity
                style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                }}
                onPress={() => {
                    setType(
                    type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                </TouchableOpacity>
            </View>
        </Camera>
    </View>
    );
    }
    return(
        <View style={styles.container}>
            {/* <ImageBackground source={image} style={styles.image}>
                <Mybutton title={'Detect'} customClick={() => detect()} />  
            </ImageBackground> */}
            <Mybutton title={'Detect'} customClick={() => detect()} />
        </View>
    );
}