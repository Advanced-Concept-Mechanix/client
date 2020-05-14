import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import styles from './style';
import MyText from '../components/mytext';

export default function allProducts(){

    const[allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
              let response = await fetch(
                'http://62.171.181.137/products/'
              );
              let json = await response.json();
              setAllProducts(json);
              console.log(json);
            } catch (error) {
              console.error(error);
            }
          }
    });

    const productList = allProducts.map((product) => 
        <li>{product}</li>
    );

    return(
        <View style={styles.container}>
            <Text>List of all products</Text>
            <ul>{productList}</ul>
        </View>
    );
}