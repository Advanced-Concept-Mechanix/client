/**
 * Colour transformation functions
 *
 * @author John Noel <john.noel@chaostangent.com>
 */
export default class Colour
{
    /**
     * Convert the image data into grayscale
     *
     * This just takes the average of all three colour values (RGB) and sets
     * each channel to that value. Alpha information is preserved
     *
     * @param ImageData imageData An ImageData object, usually from a <canvas>
     * @return ImageData Returns a new ImageData object
     * @see http://www.johndcook.com/blog/2009/08/24/algorithms-convert-color-grayscale/
     */
    static grayscale(imageData) {
        let pixelCount = imageData.width * imageData.height,
            converted = new Uint8ClampedArray(pixelCount * 4);

        for (let i = 0; i < pixelCount; i++) {
            let offset = i * 4,
                gray = Math.floor(imageData.data[offset] + imageData.data[offset + 1] + imageData.data[offset + 2]) / 3;

            for (let j = 0; j < 3; j++) {
                converted[offset + j] = gray;
            }

            // retain alpha channel
            converted[offset + 3] = imageData[offset + 3];
        }

        return new ImageData(converted, imageData.width, imageData.height);
    }

    /**
     * Convert the image data into YCbCr and extract the luminosity (Y) part
     *
     * This uses ITU-R BT.601 conversion method and will retain any alpha
     * information on a pixel
     *
     * @param ImageData imageData An ImageData object, usually from a <canvas>
     * @return ImageData Returns a converted ImageData object
     * @see https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.601_conversion
     */
    static luminosity(imageData) {
        let pixels = imageData.width * imageData.height;
        let converted = new Uint8ClampedArray(pixels * 4);

        for (let i = 0; i < pixels; i++) {
            let offset = i * 4;

            converted[offset] = 0.299 * imageData.data[offset];
            converted[offset + 1] = 0.587 * imageData.data[offset + 1];
            converted[offset + 2] = 0.114 * imageData.data[offset + 2];
            converted[offset + 3] = imageData.data[offset + 3];
        }

        return new ImageData(converted, imageData.width, imageData.height);
    }
}