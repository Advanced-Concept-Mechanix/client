import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert } from 'react-native';

import styles from './style';

export default function productDetails(){

    const productData = global.PRODUCTDATA;
    const data = productData.data;
    //const{data} = route.params;
    const dataObj = JSON.parse(data);

    return(
        <View style={styles.container}>
            <Text>Name: {dataObj.name}</Text>
            <Text>UUID: {dataObj.UUID}</Text>
            <Text>Date Of Manufacture: {dataObj.dateOfManufacture}</Text>
            <Text>Date of Expiry: {dataObj.dateOfExpiry}</Text>
            <Text>Description: {dataObj.description}</Text>
            <Text>Manufacturer: {dataObj.manufacturer}</Text>
        </View>
    );
}