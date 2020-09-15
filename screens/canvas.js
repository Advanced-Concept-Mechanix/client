import React from 'react';
import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';
import handleImageData from '../functions/imageProcessing/handleImage';
import {
    View, Image
} from 'react-native';

import styles from './style';

const Example = ({sample}) => (
    <View>
      <Image source={sample} style={styles.imageStyle} />
    </View>
  );

export default function App(){
    return (
        <View style={styles.full}>
            <Example sample={require('../assets/purple-black-rect.png')}>
                <Canvas ref={handleImageData} />
            </Example>
        </View>
    );
}