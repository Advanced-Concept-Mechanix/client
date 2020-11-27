import Colour from './Colour';
import Resample from './Resample';

/**
 * Difference hash for images
 *
 * @author John Noel <john.noel@chaostangent.com>
 * @see http://www.hackerfactor.com/blog/?/archives/529-Kind-of-Like-That.html
 * @see https://github.com/jenssegers/imagehash/blob/master/src/Implementations/DifferenceHash.php
 */
class Difference
{
    /**
     * Hash the given image data
     *
     * @param ImageData imageData An ImageData object, usually from a <canvas>
     * @return integer
     */
    static hash(imageData) {
        let size = Difference.size,
            w = size,
            h = size + 1;

        if (imageData.width != w || imageData.height != h) {
            imageData = Resample.nearestNeighbour(imageData, w, h);
        }

        imageData = Colour.grayscale(imageData);

        let hash = 0,
            one = 1;

        for (let y = 0; y < h; y++) {
            // ignore other channels as already converted to grayscale
            let left = imageData.data[4 * w * y];

            for (let x = 1; x < w; x++) {
                let right = imageData.data[4 * (w * x + y)];

                if (left > right) {
                    hash |= one;
                }

                left = right;
                one = one << 1;
            }
        }

        return hash;
    }
}

Difference.size = 8;

export default Difference;