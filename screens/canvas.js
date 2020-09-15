import React, { Component } from 'react';
import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';
import handleImageData from '../functions/imageProcessing/handleImage';
import {
    StyleSheet, Dimensions, View, StatusBar, ScrollView, Image
} from 'react-native';

const Example = ({sample, children}) => (
    <View style={styles.example}>
      <View style={styles.exampleLeft}>{children}</View>
      <View style={styles.exampleRight}>
        <Image source={sample} style={{width: 100, height: 100}} />
      </View>
    </View>
  );

export default function App(){
    return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <ScrollView style={styles.examples}>
            <Example sample={require('../assets/purple-black-rect.png')}>
              <Canvas ref={handleImageData} />
            </Example>
          </ScrollView>
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