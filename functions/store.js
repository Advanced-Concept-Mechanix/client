import * as SecureStore from 'expo-secure-store';

const Store = async (key, value) => {

  if (typeof value === 'object' && value !== null) {
    SecureStore.setItemAsync(key, JSON.stringify(value))
  }
  else if(value === 'delete') {
    SecureStore.deleteItemAsync(key)
  }
  else {
    let json = await SecureStore.getItemAsync(key)
    return JSON.parse(json);
  }

}

export default Store