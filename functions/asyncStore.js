import { AsyncStorage } from 'react-native';

const _fail = async (msg) => {
    return {
        msg:msg
    }
}

const _storeAsync = async (key, value, type) => {

    if (typeof value === 'object' && value !== null && type === 'set'){
        try{
            await AsyncStorage.setItem(key, JSON.stringify(value));
        }catch(error){
            console.log(error);
            //return _fail('Could not find item');
        }
    }else if(type === 'delete'){
        try{
            await AsyncStorage.removeItem(key);
        }catch(error){
            console.log(error);
        }
    }else if(type === 'get'){
        try{
            let json = await AsyncStorage.getItem(key);
            return JSON.parse(json);
        }catch(error){
            console.log(error);
        }
    }else if(type === 'merge'){
        try{
            await AsyncStorage.mergeItem(key, JSON.stringify(value));
        }catch(error){
            console.log(error);
        }
    }
}

export default _storeAsync;