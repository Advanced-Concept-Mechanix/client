const hasProperties = (arr, obj) => {
    if (arr.every(function(x) { return x in obj; }));
}

const checkProps = (arr, obj) => {
    for(i = 1; i < arr.length; i++){
        if(!(arr[i] in obj)){
            console.log(`${arr[i]} is not in ${obj}`);
            return false;
        }
    }
    return true;
}

//export default hasProperties;
export default checkProps;