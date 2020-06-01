import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './style';
import store from '../functions/store';
import Mybutton from '../components/mybutton';
import strings from '../config/strings';
import postData from '../functions/postData';

export default function newBlock({navigation}){

    const[index, setIndex] = useState(null);
    const[timestamp, setTimestamp] = useState(null);
    const[txSummary, setTxSummary] = useState(null);
    const[hash, setHash] = useState(null);
    const[previousHash, setPreviousHash] = useState(null);
    const[nonce, setNonce] = useState(null);
    const[difficulty, setDifficulty] = useState(null);
    const[loadingText, setLoadingText] = useState('Creating Block...');

    useEffect(() => {
        let loading = true;
        const url = strings.API_KEY + 'blocks/new/'

        postData(url)
        .then(async(response) => {
            if(loading){
                if(response.ok){
                    let data = await response.json();
                    setIndex(`Index: ${data.block.index}`);
                    setTimestamp(`Timestamp: ${data.block.timestamp}`);
                    setTxSummary(`TxSummary: ${data.block.txSummary}`);
                    setHash(`Hash: ${data.block.hash}`);
                    setPreviousHash(`Previous Hash: ${data.block.previousHash}`);
                    setNonce(`Nonce: ${data.block.nonce}`);
                    setDifficulty(`Difficulty: ${data.block.difficulty}`);
                    setLoadingText('Block Created');
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
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        return () => {
            loading = false;
        };
    }, []);

    if(!index || !timestamp || !txSummary || !hash || !previousHash || !nonce || !difficulty){
        return(
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text>{loadingText}</Text>
                </TouchableOpacity> 
            </View>
        )
    }
    
    return(
        <View style={styles.container}>
            <Text>{loadingText}</Text>
            <Text>{index}</Text>
            <Text>{timestamp}</Text>
            <Text>{hash}</Text>
            <Text>{previousHash}</Text>
            <Text>{nonce}</Text>
            <Text>{difficulty}</Text>
        </View>
    );
}