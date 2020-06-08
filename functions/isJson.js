const CheckJson = (str) => {

    if (typeof str !== "string"){
        console.log('Data is not string')
        return false;
    }
    try {
        var json = JSON.parse(str);
        if(typeof json !== 'object'){
            console.log('json is not object!')
            return false;
        }else if(json === null){
            console.log('Json is null');
            return false;
        }else{
            return true;
        }
    } catch (e) {
        console.log('Parsing Error');
        return false;
    }
}

export default CheckJson;