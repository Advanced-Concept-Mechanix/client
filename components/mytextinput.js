/*Custom TextInput*/
import React, {useRef, useEffect, forwardRef} from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

const Mytextinput = forwardRef((props,ref) => {

  const textInputRef = useRef().current;

  useEffect(() => {
      if(!ref) return;
      // expect that if a ref has been given to this component, it is either a function or an object created by React.createRef();
      typeof ref === 'function' ? ref(textInputRef) : (ref.current = textInputRef);

      //  clean up (hint: 99.999% of the time the only time the clean up function will be called is when this component unmounts)
      return () => typeof ref === 'function' ? ref(null) : (ref.current = null);

      // this is to satisfy the exhaustive dependency eslint rule of hooks. In practice, it's **likely** this hook will only ever get fired twice - when the component mounts and when it unmounts as the `ref` and someInternalRef will (again, **likely**) never change.
      },[textInputRef,ref])

  const focus = () => {
    if (textInputRef) {
      textInputRef.focus();
    }
  };
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: '#007FFF',
        borderWidth: 1,
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#007FFF"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        onSubmitEditing={props.onSubmitEditing}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
        ref={textInputRef}
        secureTextEntry={props.secureTextEntry}
      />
      <Text style={styles.errorText}>{props.error || ""}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  errorText: {
    // Setting a fixed text height prevents the label
    // "jump" when we show/hide it
    height: 20,
    color: colors.TORCH_RED
  }
});
export default Mytextinput;