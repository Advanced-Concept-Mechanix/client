/**
 * Image resampling algorithms
 *
 * @author John Noel <john.noel@chaostangent.com>
 */
export default class Resample
{
    /**
     * Resample an image using nearest neighbour
     *
     * @param ImageData imageData
     * @param integer targetWidth
     * @param integer targetHeight
     * @return ImageData
     * @see http://tech-algorithm.com/articles/nearest-neighbor-image-scaling/
     */
    static nearestNeighbour(imageData, targetWidth, targetHeight) {
        let w = imageData.width,
            h = imageData.height,
            xr = w / targetWidth,
            yr = h / targetHeight,
            ret = new Uint8ClampedArray((targetWidth * targetHeight) * 4);

        for (let i = 0; i < targetHeight; i++) {
            for (let j = 0; j < targetWidth; j++) {
                let px = Math.floor(j * xr),
                    py = Math.floor(i * yr);

                let rt = 4 * ((i * targetWidth) + j),
                    rs = 4 * ((py * w) + px);

                for (let k = 0; k < 4; k++) {
                    ret[rt+k] = imageData.data[rs+k];
                }
            }
        }

        return new ImageData(ret, targetWidth, targetHeight);
    }


    /**
     * Resample an image using bilinear
     *
     * @param ImageData imageData
     * @param integer targetSize
     * @return ImageData
     * @see http://tech-algorithm.com/articles/bilinear-image-scaling/
     */
    static bilinear(imageData, targetSize) {
        let w = imageData.width,
            h = imageData.height,
            xr = w / targetSize,
            yr = h / targetSize,
            ret = new Uint8ClampedArray((targetSize * targetSize) * 4),
            offset = 0;

        for (let i = 0; i < targetSize; i++) {
            for (let j = 0; j < targetSize; j++) {
                let x = Math.round(xr * j),
                    y = Math.round(yr * i),
                    xd = (xr * j) - x,
                    yd = (yr * i) - y,
                    idx = (y * w + x) * 4;

                for (let k = 0; k < 4; k++) {
                    let a = imageData.data[idx + k],
                        b = imageData.data[idx + k + 4],
                        c = imageData.data[idx + k + w],
                        d = imageData.data[idx + k + w + 4];

                    ret[offset + k] = a * (1 - xd) * (1 - yd) + b * xd * (1 - yd) +
                        c * yd * (1 - xd) + d * xd * yd;
                }

                offset += 4;
            }
        }

        return new ImageData(ret, targetSize, targetSize);
    }

    /**
     * Resample an image using bicubic
     *
     * @param ImageData imageData
     * @param integer targetSize
     * @return ImageData
     * @see http://techslides.com/javascript-image-resizer-and-scaling-algorithms
     * @see http://jsfiddle.net/HZewg/1/
     */
    static bicubic(imageData, targetSize) {
        // todo
    }
}