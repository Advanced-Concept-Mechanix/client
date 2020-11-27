/**
 * Discrete Cosine Transforms in JavaScript
 *
 * Not my code, mostly translated from other language implementations
 *
 * @author John Noel <john.noel@chaostangent.com>
 */
export default class DCT
{
    /**
     * 1 dimensional DCT
     *
     * @param integer N size
     * @param array f A 1 dimensional array of values
     * @return Float64Array
     * @see https://github.com/jenssegers/imagehash/blob/master/src/Implementations/PerceptualHash.php
     */
    static DCT1D(N, f) {
        let F = new Float64Array(N);

        for (let i = 0; i < N; i++) {
            let sum = 0;

            for (let j = 0; j < N; j++) {
                sum += f[j] * Math.cos(i * Math.PI * (j + 0.5) / N);
            }

            sum *= Math.sqrt(2 / N);

            if (i == 0) {
                sum *= 1 / Math.sqrt(2);
            }

            F[i] = sum;
        }

        return F;
    }

    /**
     * 2 dimensional DCT
     *
     * @param integer N size
     * @param array f A 1 dimensional array of values
     * @return Float64Array
     * @see https://github.com/naptha/phash.js/blob/master/phash.js
     */
    static DCT2D(N, f) {
        let c = new Float64Array(N);

        for (let i = 1; i < N; i++) {
            c[i] = 1;
        }
        c[0] = 1 / Math.sqrt(2);

        let F = new Float64Array(N * N);

        // precompute cosine lookup table
        let entries = (2 * N) * (N - 1);
        let COS = new Float64Array(entries);
        for (let i = 0; i < entries; i++) {
            COS[i] = Math.cos(i / (2 * N) * Math.PI);
        }

        for (let u = 0; u < N; u++) {
            for (let v = 0; v < N; v++) {
                let sum = 0;

                for (let i = 0; i < N; i++) {
                    for (let j = 0; j < N; j++) {
                        sum += COS[(2 * i + 1) * u]
                            * COS[(2 * j + 1) * v]
                            * f[N * i + j];
                    }
                }

                sum *= ((c[u] * c[v]) / 4);
                F[N * u + v] = sum;
            }
        }

        return F;
    }
}