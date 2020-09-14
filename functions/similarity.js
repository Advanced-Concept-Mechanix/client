const similarity = (hash1, hash2) => {
    var similarity = hash1.length;
  
    array.forEach(hash1, function(val,key){
        if(hash1[key] != hash2[key]){
        similarity--;
        }
    });

    return (similarity/hash1.length*100).toFixed(2);
}

export default similarity;