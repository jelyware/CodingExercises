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
 * Complete the 'kangaroo' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER x1 - position of kangaroo 1
 *  2. INTEGER v1 - jump distance of kangaroo 1
 *  3. INTEGER x2 - position of kangaroo 2
 *  4. INTEGER v2 - jump distance of kangaroo 2
 */

function kangaroo(x1, v1, x2, v2) {
    // After testing different scenarios, it seems that number of jumps is same for kangaroo 1 and      
    // kangaroo 2!  Therefore, x1 + (v1 * # of jumps) = x2 + (v2 * # of jumps), so       
    // x1 - x2 = # of jumps(v2 - v1) ==> # of jumps = |(x1 - x2)| / |(v1 - v2)|.
    if ( v2 >= v1 ) {
        // Base case: kangaroo 2 will always be ahead due to the constraint that kangaroo 2's starting 
        // point is always great than that of kangaroo 1.
        return 'NO';
    }
    return (Math.abs((x1-x2) % (v1-v2)) == 0) ? 'YES' : 'NO';

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const x1 = parseInt(firstMultipleInput[0], 10);

    const v1 = parseInt(firstMultipleInput[1], 10);

    const x2 = parseInt(firstMultipleInput[2], 10);

    const v2 = parseInt(firstMultipleInput[3], 10);

    const result = kangaroo(x1, v1, x2, v2);

    ws.write(result + '\n');

    ws.end();
}
