import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import styles from './style';
import store from '../functions/store';
import Mybutton from '../components/mybutton';
import strings from '../config/strings';
import getData from '../functions/getData';

export default function Allblocks({navigation}){

    const[blocks, setBlocks] = useState([]);
    const[loadingText, setLoadingText] = useState('Loading Blocks...');
    const[validity, setValidity] = useState('true');

    useEffect(() => {
        let loading = true;

        async function fetchData(){
            await getData(`${strings.API_KEY}blocks`)
            .then(async(response) => {
                if(response.ok){
                    let data = await response.json();
                    if(data.blocks.length === 0){
                        setLoadingText('No Blocks Found!');
                    }
                    if(loading){
                        if(data.validity === true){
                            setLoadingText('Blockchain');
                            setValidity('true');
                            setBlocks(data.blocks);
                        }else{
                            setLoadingText('Blockchain');
                            setValidity('false');
                            setBlocks(data.blocks);
                        }
                    }
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
        }

        fetchData();

        return () => {
            loading = false;
        };
    });

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    if(blocks.length === 0){
        return(
            <View style={styles.container}>
                <Text>{loadingText}</Text>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <Text>{loadingText}</Text>
                <Text>{`Validity: ${validity}`}</Text>
                <FlatList 
                data={blocks}
                ItemSeparatorComponent={ListViewItemSeparator}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigation.navigate('singleBlock', {
                        item: item
                    })}>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text>Id: {item._id}</Text>
                            <Text>Nonce: {item.nonce}</Text>
                            <Text>Timestamp: {item.timestamp}</Text>
                            <Text>Index: {item.index}</Text>
                            <Text>Previous Hash: {item.previousHash}</Text>
                            <Text>Merkle Root: {item.merkleRoot}</Text>
                            <Text>Hash: {item.hash}</Text>
                            <Text>Last Transaction: {item.lastTx}</Text>
                        </View>
                    </TouchableOpacity> 
                } 
                keyExtractor={(item) => item._id}
                />
            </View>
        );
    }
}