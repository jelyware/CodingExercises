'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'compareTriplets' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a - triplet array containing A's ratings
 *  2. INTEGER_ARRAY b - triplet array containing B's ratings
 */

function isScoreValueWithinOneAndOneHundred(x, y) {
    /** Helper function for compareTriplets()
     * x represents a value from triplet array A at some index.
     * y represents a value at the same index as x from triplet array B
     */
    return x >= 1 && x <= 100 && y >= 1 && y <= 100;
}

function compareTriplets(a, b) {
    /** Find the comparison points by comparing a[0] with b[0], a[1] with b[1], and a[2] with b[2].
     * Return array with A's comparison score in first position and that of B's in second position,
     * e.g. [aScore, bScore].
     */
    let aScore = 0;
    let bScore = 0;
    if (a.length == 3 && b.length == a.length) {
        for (let i=0; i < a.length; i++) {
            if ( isScoreValueWithinOneAndOneHundred(a[i], b[i]) ) {
                if (a[i] > b[i]) {
                    aScore++;
                } else if (a[i] < b[i]) {
                    bScore++;
                }
            }
        }
    }
    return [aScore, bScore];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const b = readLine().replace(/\s+$/g, '').split(' ').map(bTemp => parseInt(bTemp, 10));

    const result = compareTriplets(a, b);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
