import array_sum from './array_sum';

const phash = (imgData, size) => {
    var pixels = [];

    for (var i=0;i<imgData.data.length;i+=4){
            
        var j = (i==0) ? 0 : i/4;
            var y = Math.floor(j/size);
            var x = j-(y*size);			
            
            var pixelPos = x + (y*size);
            var r = imgData.data[i];
            var g = imgData.data[i+1];
            var b = imgData.data[i+2];
    
            var gs = Math.floor((r*0.299)+(g*0.587)+(b*0.114));
            pixels[pixelPos] = gs;
        
    }
    
    var avg = Math.floor( array_sum(pixels) / pixels.length );
    var hash = [];
    array.forEach(pixels, function(px,i){
    if(px > avg){
        hash[i] = 1;
    } else{
        hash[i] = 0;
    }
    });
    
    return hash;
}

export default phash;