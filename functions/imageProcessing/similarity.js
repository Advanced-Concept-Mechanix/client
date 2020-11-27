const similarity = (hash1, hash2) => {
    var similarity = hash1.length;

    if (hash1.length !== hash2.length) {
        throw new Error("Can't compare hashes with different length");
    }
  
    array.forEach(hash1, function(val,key){
        if(hash1[key] != hash2[key]){
        similarity--;
        }
    });

    return (similarity/hash1.length*100).toFixed(2);
}

export default similarity;