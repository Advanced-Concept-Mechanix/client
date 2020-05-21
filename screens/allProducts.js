import React, {useState, useEffect, Component} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  SectionList,
  FlatList
} from 'react-native';
import styles from './style';
import getData from '../fetchFunctions/getData';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AllProducts extends Component{
    state = {
        products: []
    };

    UNSAFE_componentWillMount(){
        this.getProducts();
    }

    getProducts = async () => {
        await getData('http://62.171.181.137/products/')
        .then( async (response) => {
            if(response.ok){
                let data = await response.json();
                //console.log(data.products);
                this.setState({products: data.products});
            }else{
                let data = await response.json();
                console.log('Failure: ', data);
                Alert.alert(
                    'Failed',
                    data.message,
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    render(){
        if(this.state.products.length === 0){
            return(
                <View style={styles.container}>
                    <Text>
                        Loading....
                    </Text>
                </View>
            );
        }else{
            return(
                <View style={styles.container}>
                    <FlatList 
                    data={this.state.products}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleProduct', {
                            item: item
                        })}>
                            <View style={{ backgroundColor: 'white', padding: 20 }}>
                                <Text>Id: {item._id}</Text>
                                <Text>Name: {item.name}</Text>
                                <Text>Manufacturer: {item.manufacturer}</Text>
                                <Text>Description: {item.description}</Text>
                                <Text>Date Of Manufacture: {item.dateOfManufacture}</Text>
                                <Text>Days Before Expiry: {item.daysBeforeExpiry}</Text>
                            </View>
                        </TouchableOpacity> 
                    } 
                    keyExtractor={(item) => item._id}
                    //extraData={selected}
                />
                </View>
            );
        }
    }
}