import Colour from './Colour';
import Resample from './Resample';

/**
 * Average hash for images
 *
 * @author John Noel <john.noel@chaostangent.com>
 * @see http://www.hackerfactor.com/blog/index.php?/archives/432-Looks-Like-It.html
 * @see https://github.com/jenssegers/imagehash/blob/master/src/Implementations/AverageHash.php
 */
class Average
{
    /**
     * Hash the given image data
     *
     * @param ImageData imageData An ImageData object, usually from a <canvas>
     * @return integer
     */
    static hash(imageData, canvas) {
        let size = Average.size,
            pixelCount = (size * size);

        // console.log(`avgwidth:${imageData.width}. avgheight:${imageData.height}`);

        if (imageData.width != size || imageData.size != size) {
            // console.log(`Scaling the image`);
            imageData = Resample.nearestNeighbour(canvas, imageData, size, size);
            console.log(`new imagedata:${typeof imageData}`);
            console.log(imageData.data);
        }

        imageData = Colour.grayscale(canvas, imageData);

        let sum = 0;
        for (let i = 0; i < pixelCount; i++) {
            // already grayscale so just take the first channel
            console.log(`new imagedata:${typeof imageData}`);
            console.log(imageData.data);
            sum += imageData.data[4 * i];
        }

        let average = Math.floor(sum / pixelCount),
            hash = 0,
            one = 1;

        for (let i = 0; i < pixelCount; i++) {
            if (imageData.data[4 * i] > average) {
                hash |= one;
            }

            one = one << 1;
        }

        return hash;
    }
}

Average.size = 8;

export default Average;