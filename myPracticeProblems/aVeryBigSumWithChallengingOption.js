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
 * Complete the 'aVeryBigSum' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER_ARRAY ar as parameter.
 * 
 * PERSONAL NOTE from Jessica Lynch:  I wanted to try the harder way of doing this just to challenge
 * myself, but an easier way to do this would be to rely on BigInt library to handle big numbers in
 * javascript.
 */

function reverseString(numString) {
    return numString.split("").reverse().join("");
}

function addTwoLargeSums(first, second) {
    /** Helper function for aVeryBigSum */
    let sum = '';
    let carry = 0;
    
    // Find longest number (if exists) and calculate array length difference
    let firstNumString = (first.length === second.length || first.length > second.length) ?
        first : second;
    let secondNumString = (first === firstNumString) ? second : first;
    const arrayLengthDiff = firstNumString.length - secondNumString.length;

    // Loop backwards through the array of chars in each large num string
    // starting with the longest number and protecting against string length difference.
    // NOTE: Execution is analogous to manually adding to numbers on paper.
    for (let i = firstNumString.length - 1; i >= 0; i--) {
        // Adjust index if first and second num strings are different lengths
        const indexDiffAdjust = (arrayLengthDiff != 0) ?
            (i - arrayLengthDiff - 1) : i;
        console.log('indexDiffAdjust is: ', indexDiffAdjust)
        const firstNumToAdd = Number(firstNumString.charAt(i));
        console.log('firstNumToAdd is: ', firstNumToAdd)
        const secondNumToAdd = (indexDiffAdjust > -1) ?
            Number(secondNumString.charAt(indexDiffAdjust)) : 0;
        console.log('secondNumToAdd is: ', secondNumToAdd)
        const temp = firstNumToAdd + secondNumToAdd + carry;

        // Append correct digit to sum string and account for carry value
        if (temp >= 10 ) {
            sum += (temp % 10)
            carry = ( temp - (temp % 10) ) / 10
        } else {
            sum += temp
            carry = 0;
        }
    }
    
    // Ensure we return an integer value
    return Number(reverseString(sum));
}

function aVeryBigSum(lrgNumArray, challenging=false) {
    // Parent function that updates the cumulative big num value
    if (challenging) {
        let cumulativeValue = 0;
        let nextValue = 0;
        for (let i=0; i < lrgNumArray.length; i++) {
            const isFirstArrayElement = i == 0;
            const isLastArrayElement = i <= lrgNumArray.length-1;
            nextValue = (isLastArrayElement) ? lrgNumArray[i] : lrgNumArray[i+1];
            cumulativeValue = (isFirstArrayElement) ?
                lrgNumArray[i] : addTwoLargeSums(
                    cumulativeValue.toString(),
                    nextValue.toString()
                );
        }
        return cumulativeValue; 
    }
    
    // The simplest case (use built-in BigInt javascript library)
    // NOTE: Other languages have other built-in capabilities, e.g. use of long in Java. 
    let bigIntCumulativeValue = BigInt(0);
    for (let i=0; i < lrgNumArray.length; i++) {
        bigIntCumulativeValue += BigInt(lrgNumArray[i].toString());
    }
    return bigIntCumulativeValue;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arCount = parseInt(readLine().trim(), 10);

    const ar = readLine().replace(/\s+$/g, '').split(' ').map(arTemp => parseInt(arTemp, 10));

    // Usage
    const result = aVeryBigSum(ar);

    ws.write(result + '\n');

    ws.end();
}
