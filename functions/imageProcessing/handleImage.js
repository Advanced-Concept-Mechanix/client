import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';

//A function for getting the image data from a canvas

const handleImage = (canvas) => {
    const context = canvas.getContext('2d');
    // context.fillStyle = 'purple';
    // context.fillRect(0, 0, 100, 100);

    context.getImageData(0, 0, 100, 100)
    .then(imageData => {
        // console.log(`imageData`);
        // console.log(imageData);
        const data = Object.values(imageData.data);
        // console.log(`data`);
        // console.log(data);
        const length = Object.keys(data).length;
        // console.log(`length`);
        // console.log(length);

        const imgData = {
            width:imageData.width,
            height:imageData.height,
            data:imageData.data
        }
        // console.log(`width:${imageData.width}, height:${imageData.height}`)
        // console.log(imgData);
        
        return imgData;
    });
}

export default handleImage;