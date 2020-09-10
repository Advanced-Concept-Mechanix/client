import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

import styles from './style';
import Mybutton from '../components/mybutton';

export default function cdp(){

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const camera = useRef();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const snap = async () => {
        if (camera.current) {
          let photo = await camera.current.takePictureAsync();
        }
    };

    const onCameraReady = () => {
        setIsCameraReady(true);
    };
    
    if (hasPermission === null) {
    return <View />;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }
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