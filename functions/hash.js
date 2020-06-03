import * as Crypto from 'expo-crypto';

const hash = async(value) => {
    let digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        value
    );
    //console.log(digest.toString(16))
    return digest.toString(16);
}

export default hash;