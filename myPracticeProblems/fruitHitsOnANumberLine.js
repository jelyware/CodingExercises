'use strict';

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
 * Complete the 'countApplesAndOranges' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER s - point s of range between s and t where Sam's house is located
 *  2. INTEGER t - point t of range between s and t where Sam's house is located
 *  3. INTEGER a - point at which apple tree is located
 *  4. INTEGER b - point at which orange tree is located
 *  5. INTEGER_ARRAY apples - array of positive and negative distances within which apples are thrown from   * their tree.
 *  6. INTEGER_ARRAY oranges - array of positive and negative distances within which opranges are thrown 
 * from their tree.
 */

function printHitCount(fruits, treePos, leftSide, rightSide) {
    let fruitHits = 0;
    for (const thrownDistance of fruits) {
        const hitPoint = thrownDistance+treePos;
        if ( (hitPoint >= leftSide) && (hitPoint <= rightSide) ) {
            fruitHits++;
        }        
    }
    console.log(fruitHits);
}

function countApplesAndOranges(s, t, a, b, apples, oranges) {
    // Write your code here
    // Loop through thrown distances of apples and oranges to see if any plus tree position (a or b) exceed the distance from left (s) and right (t) sides of Sam's house.
    printHitCount(apples, a, s, t);
    printHitCount(oranges, b, s, t);
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const s = parseInt(firstMultipleInput[0], 10);

    const t = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const a = parseInt(secondMultipleInput[0], 10);

    const b = parseInt(secondMultipleInput[1], 10);

    const thirdMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(thirdMultipleInput[0], 10);

    const n = parseInt(thirdMultipleInput[1], 10);

    const apples = readLine().replace(/\s+$/g, '').split(' ').map(applesTemp => parseInt(applesTemp, 10));

    const oranges = readLine().replace(/\s+$/g, '').split(' ').map(orangesTemp => parseInt(orangesTemp, 10));

    countApplesAndOranges(s, t, a, b, apples, oranges);
}
