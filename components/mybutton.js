/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybutton = props => {

  const buttonStyle = [
    styles.button,
    props.disabled
      ? styles.buttonDisabled
      : styles.buttonEnabled
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={props.customClick}
      disabled={props.disabled}
      >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f05555',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  buttonEnabled: {
    opacity: 1
  },
  buttonDisabled: {
    opacity: 0.3
  },
  text: {
    color: '#ffffff',
  },
});
export default Mybutton;