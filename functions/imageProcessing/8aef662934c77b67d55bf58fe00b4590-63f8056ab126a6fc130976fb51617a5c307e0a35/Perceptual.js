import DCT from './DCT';
import Colour from './Colour';
import Resample from './Resample';

/**
 * Perceptual hash for images
 *
 * @author John Noel <john.noel@chaostangent.com>
 * @see http://www.phash.org/
 * @see https://github.com/jenssegers/imagehash
 */
class Perceptual
{
    /**
     * Hash the given image data
     *
     * @param ImageData imageData An ImageData object, usually from a <canvas>
     * @return integer
     */
    static hash(imageData) {
        let size = Perceptual.size;

        if (imageData.width != size || imageData.height != size) {
            imageData = Resample.nearestNeighbour(imageData, size, size);
        }

        imageData = Colour.luminosity(imageData);

        // take a 1D DCT of each row
        let rows = [];
        for (let y = 0; y < size; y++) {
            let row = new Float64Array(size);

            for (let x = 0; x < size; x++) {
                let base = 4 * (size * x + y);
                row[x] = imageData.data[base]
                    + imageData.data[base + 1]
                    + imageData.data[base + 2];
            }

            rows[y] = DCT.DCT1D(size, row);
        }

        // then take a 1D DCT of each column
        let matrix = [];
        for (let x = 0; x < size; x++) {
            let col = new Float64Array(size);

            for (let y = 0; y < size; y++) {
                col[y] = rows[y][x];
            }

            matrix[x] = DCT.DCT1D(size, col);
        }

        // grab the top 8x8 pixels
        let top8 = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                top8.push(matrix[y][x]);
            }
        }

        // calculate the median
        let median = top8.slice(0).sort((a, b) => {
            return a - b;
        })[31];

        let hash = 0;
        let one = 1;

        // calculate the hash
        for (let i = 0; i < 64; i++) {
            if (top8[i] > median) {
                hash |= one;
            }

            one = one << 1;
        }

        return hash;
    }
}

Perceptual.size = 32;

export default Perceptual;