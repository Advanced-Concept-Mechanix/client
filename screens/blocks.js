import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './style';
import Mybutton from '../components/mybutton';

export default function blocks({navigation}){

    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Mybutton
                    title='Create Block'
                    customClick={() => navigation.navigate('NewBlock')}
                    />
                    <Mybutton
                    title='View All Blocks'
                    customClick={() => navigation.navigate('AllBlocks')}
                    />
                </View>
            </TouchableOpacity> 
        </View>
    )
}