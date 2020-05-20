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
import Mytext from '../components/mytext';
import getData from '../fetchFunctions/getData';

export default class AllProducts extends Component{
    state = {
        products: []
    };

    componentWillMount(){
        this.getProducts();
    }

    getProducts = async () => {
        await getData('http://62.171.181.137/products/')
        .then( async (response) => {
            if(response.ok){
                let data = await response.json();
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

    render(){
        return(
            <View style={styles.container}>
                <FlatList 
                data={this.state.products}
                renderItem={({ item }) => 
                    <View>
                        <Mytext>Id: {item._id}</Mytext>
                        <Mytext>Name: {item.name}</Mytext>
                        <Mytext>Manufacturer: {item.manufacturer}</Mytext>
                        <Mytext>Description: {item.description}</Mytext>
                        <Mytext>Date Of Manufacture: {item.dateOfManufacture}</Mytext>
                        <Mytext>Days Before Expiry: {item.daysBeforeExpiry}</Mytext>
                    </View>
                } 
                keyExtractor={(item) => item._id}
            />
            </View>
        );
    }
}

// export default async function allProducts(){

//     const[products, setProducts] = useState([]);

//     const getProducts = async () => {
//         await getData('http://62.171.181.137/products/')
//         .then( async (response) => {
//             if(response.ok){
//                 let data = await response.json();
//                 //console.log(data.products);
//                 //let obj = data.products;
//                 // let productsArray = data.products.map(obj => Object.values(obj));

//                 // console.log(productsArray);
//                 // return productsArray;
//                 return data.products;
//             }else{
//                 let data = await response.json();
//                 console.log('Failure: ', data);
//                 Alert.alert(
//                     'Failed',
//                     data.message,
//                     [
//                         {
//                             text: 'Ok'
//                         },
//                     ],
//                     { cancelable: false }
//                 );
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     };

//     useEffect(async () => {
//         let productList = await getProducts();
//         setProducts(productList);
//     });
    
//     // var productsArray = Object.keys(products).map(function(key){
//     //     return [key, products[key]];
//     // });


//     const Item = ({ title }) => (
//       <View>
//         <Mytext>Id: {title._id}</Mytext>
//         <Mytext>Name: {title.name}</Mytext>
//         <Mytext>Manufacturer: {title.manufacturer}</Mytext>
//         <Mytext>Description: {title.description}</Mytext>
//         <Mytext>Date Of Manufacture: {title.dateOfManufacture}</Mytext>
//         <Mytext>Days Before Expiry: {title.daysBeforeExpiry}</Mytext>
//       </View>
//     );

//     return(
//         <View style={styles.container}>
//             {/* <SectionList
//             sections={products}
//             keyExtractor={(item, index) => item + index}
//             renderItem={({ item }) => <Item title={item} />}
//             renderSectionHeader={({section}) => <Mytext>{section._id}</Mytext>}
//             /> */}
//             <FlatList 
//             data={products}
//             renderItem={({ item }) => <Item title={item} />} 
//             keyExtractor={(item) => item._id}
//             />
//         </View>
//     );
// }