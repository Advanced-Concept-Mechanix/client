const checkProps = (arr, obj) => {
    for(i = 1; i < arr.length; i++){
        if(!(arr[i] in obj)){
            console.log(`${arr[i]} is not in ${obj}`);
            return false;
        }
    }
    return true;
}

export default checkProps;