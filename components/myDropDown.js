import React, {useRef, useEffect, forwardRef} from 'react';
import { View, TextInput, Text, StyleSheet, ImagePropTypes } from 'react-native';
import colors from '../config/colors';
import DropDownPicker from 'react-native-dropdown-picker';

const MyDropDown = (props) => {
    return(
        <View
        style={{
            marginLeft: 35,
            marginRight: 35,
            marginTop: 10,
            borderWidth: 1,
        }}>
            <DropDownPicker 
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                items={props.items}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                activeItemStyle={{alignItems: 'center', fontWeight: 'bold'}}
                onChangeItem={props.onChangeItem}
                searchable={props.searchable}
                searchablePlaceholder="Search..."
                searchableError="Not Found"
                min={props.min}
                max={props.max}
                zIndex={1000}
            />
        </View>
    );
}

export default MyDropDown;