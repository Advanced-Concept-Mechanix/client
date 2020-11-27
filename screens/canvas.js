import React, { Component, useState, useEffect } from 'react';
import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';
import handleImageData from '../functions/imageProcessing/handleImage';
import {
    StyleSheet, Dimensions, Text, View, TouchableOpacity, StatusBar, ScrollView, Image
} from 'react-native';
import imageProcessor from '../functions/imageProcessing/main';
import { Camera } from 'expo-camera';


const Example = ({sample, children}) => (
    <View style={styles.example}>
      <View style={styles.exampleLeft}>{children}</View>
      <View style={styles.exampleRight}>
        <Image source={sample} style={{width: 100, height: 100}} />
      </View>
    </View>
  );

// export default function App(){
//     return (
//         <View style={styles.container}>
//           <StatusBar hidden={true} />
//           <ScrollView style={styles.examples}>
//             <Example sample={require('../assets/purple-black-rect.png')}>
//               <Canvas ref={imageProcessor} />
//             </Example>
//           </ScrollView>
//         </View>
//     );
// }

snap = async () => {
  const options = {
    base64: true,
    exif: true
  }
  if (this.camera) {
    let photo = await this.camera.takePictureAsync(options)
      .then(data => console.log(data.uri))
      .catch(error => console.log(error));
    console.log('Exiting takePicture()');
  }
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

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
        ref={ref => {
          this.camera = ref;
        }}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.auto}
        autoFocus={Camera.Constants.AutoFocus.on}
        >
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
            onPress={snap}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white', backgroundColor: 'red', textAlign: 'center' }}> Snap </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const commonStyles = StyleSheet.create({
    full: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    cell: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        ...commonStyles.full,
    },
    examples: {
        ...commonStyles.full,
        padding: 5,
        paddingBottom: 0,
    },
    example: {
        paddingBottom: 5,
        flex: 1,
        flexDirection: 'row',
    },
    exampleLeft: {
        ...commonStyles.cell,
    },
    exampleRight: {
        ...commonStyles.cell,
    },
});