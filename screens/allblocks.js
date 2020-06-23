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
import LottieView from 'lottie-react-native';
import MyList from '../components/myList';

export default function Allblocks({navigation}){

    const[blocks, setBlocks] = useState([]);
    const[validity, setValidity] = useState('true');
    const[loadingAnimation, setLoadingAnimation] = useState(require('../assets/lottie/968-loading.json'));
    const[progress, setProgress] = useState(0);

    const ChangeAnimation = (url) => {
        setLoadingAnimation(url);
        setProgress(0);
    }

    useEffect(() => {
        let loading = true;

        async function fetchData(){
            await getData(`${strings.API_KEY}blocks`)
            .then(async(response) => {
                if(response.ok){
                    let data = await response.json();
                    if(data.blocks.length === 0){
                        Alert.alert(
                            'Blocks',
                            'No blocks found',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => {
                                        ChangeAnimation(require('../assets/lottie/4958-404-not-found.json'));
                                    },
                                },
                            ],
                            { cancelable: false }
                        );
                    }
                    if(loading){
                        if(data.validity === true){
                            setValidity('true');
                            setBlocks(data.blocks);
                        }else{
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
            <View style={styles.containerDark}>
                <LottieView 
                    speed={1}
                    source={loadingAnimation}
                    style={styles.lottie}
                    loop={true}
                    autoPlay={true}
                    progress={progress}
                >
                </LottieView>
            </View>
        );
    }else{
        return(
            <View style={styles.container}>
                <Text>{`Validity: ${validity}`}</Text>
                <MyList
                data={blocks}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigation.navigate('singleBlock', {
                        item: item
                    })} style={styles.item}>
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