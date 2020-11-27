import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';
import metrics from '../../config/metrics';
import Average from './Average';
import Colour from './Colour';
import DCT from './DCT';
import Difference from './Difference';
import handleImage from './handleImage';
import Perceptual from './Perceptual';
import phash from './phash';
import Resample from './Resample';
import similarity from './similarity';

const processImage = (canvas) => {

    const context = canvas.getContext('2d');
    context.fillStyle = 'purple';
    context.fillRect(0, 0, 100, 100);

    context.getImageData(0, 0, 100, 100)
    .then((imageData) => {
        const imgData = {
            width:imageData.width,
            height:imageData.height,
            data:imageData.data
        }
        // console.log(`width:${imageData.width}. height:${imageData.height}`);
        Average.hash(imageData, canvas)
        .then((avgHash) => {
            console.log(`average hash:${avgHash}`);
        })
    })
    // .then((imageData) => {
    //     Difference.hash(imageData)
    //     .then((diffhash) => {
    //         console.log(`Difference hash:${diffhash}`);
    //     })
    // })
    // .then((imageData) => {
    //     Perceptual.hash(imageData)
    //     .then((perhash) => {
    //         console.log(`Perceptual hash:${perhash}`);
    //     })
    // })
}

export default processImage;