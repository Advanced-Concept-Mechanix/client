import * as Random from 'expo-random';

const generateRandomString = async() => {
    let randomBytes = await Random.getRandomBytesAsync(1024);

    return randomBytes.toString();
}

export default generateRandomString;