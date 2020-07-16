import React, { useState } from 'react';
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
import Slider from 'react-native-slider';
import styles from './style';
import Mybutton from '../components/mybutton';
import Mytext from '../components/mytext';
import CheckBox from '@react-native-community/checkbox';
//change size, ecl, color, backgroundColor, enableLinearGradient, linearGradient, quietZone

const qrSettings = (
    size,
    ecl,
    color,
    backgroundColor,
    linearGradient,
    enableLinearGradient,
    quietZone
) => {

    const[Size, setSize] = useState(size);
    const[Ecl, setEcl] = useState(ecl);
    const[Color, setColor] = useState(color);
    const[BackgroundColor, setBackgroundColor] = useState(backgroundColor);
    const[LinearGradient, setLinearGradient] = useState(linearGradient);
    const[EnableLinearGradient, setEnableLinearGradient] = useState(enableLinearGradient);
    const[QuietZone, setQuietZone] = useState(quietZone);

    const saveSettings = () => {
        size = Size;
        ecl = Ecl;
        color = Color;
        backgroundColor = BackgroundColor;
        linearGradient = LinearGradient;
        enableLinearGradient = EnableLinearGradient;
        quietZone = QuietZone;
    }

    const eclVal = ['L','M','Q','H'];

    const colorValues = ['black', 'blue', 'red']

    return(
        <View style={styles.container}>
            <View>
                <Mytext 
                    text='Size'
                />
                <Slider 
                    value={Size}
                    onValueChange={value => setSize(value)}
                    minimumValue={100}
                    maximumValue={250}
                    step={5}
                />
            </View>
            <View>
                <Mytext 
                    text='Error Correction Level'
                />
                <Slider 
                    value={1}
                    onValueChange={value => setEcl(eclVal[value])}
                    minimumValue={0}
                    maximumValue={3}
                    step={1}
                />
            </View>
            <Mybutton 
                title="Save"
                customClick={saveSettings}
            />
        </View>
    );
    
}

qrSettings.defaultProps = {
    size:200,
    ecl:'M',
    color:'black',
    backgroundColor:'white',
    linearGradient:['rgb(255,0,0)','rgb(0,255,255)'],
    enableLinearGradient:false,
    quietZone:0
};

export default qrSettings;