import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput
} from 'react-native';
import styles from './style';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function UselessTextInput(props) {
    const [value, onChangeText] = React.useState(props.placeholder);
  
    return (
      <TextInput
        style={{ height: 40, width: windowWidth/2, borderColor: 'gray', borderWidth: 2, margin: 10 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
    );
  }
  

export default function login({ navigation }){
    return(
        <View style={styles.container}>
            <Text>login page</Text>
            <UselessTextInput placeholder="Username"/>
            <UselessTextInput placeholder="Email"/>
            <UselessTextInput placeholder="Password"/>
            <Button onPress={() => navigation.navigate('Scan')} title="Go" />
        </View>
    );
}

const loginStyles = StyleSheet.create({
    textinputs: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });