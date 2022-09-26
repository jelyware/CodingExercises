// Hacckerrank practice challenge

function _reverseString(numString) {
    return numString.split("").reverse().join("");
}

function _addTwoLargeSums(first, second) {
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
        const indexDiffAdjust = (arrayLengthDiff != 0) ?
            (i - arrayLengthDiff - 1) : i;
        console.log('indexDiffAdjust...', indexDiffAdjust)
        const firstNumToAdd = Number(firstNumString.charAt(i));
        console.log('firstNumToAdd...', firstNumToAdd)
        const secondNumToAdd = (indexDiffAdjust > -1) ?
            Number(secondNumString.charAt(indexDiffAdjust)) : 0;
        console.log('secondNumToAdd...', secondNumToAdd)
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
        
    return Number(_reverseString(sum));
}

function aVeryBigSum(lrgNumArray, challenging=false) {
    // Write your code here
    // Parent function that updates the cumulative bug num value
    if (challenging) {
        let cumulativeValue = 0;
        let nextValue = 0;
        for (let i=0; i < lrgNumArray.length; i++) {
            const isFirstArrayElement = i == 0;
            const isLastArrayElement = i <= lrgNumArray.length-1;
            nextValue = (isLastArrayElement) ? lrgNumArray[i] : lrgNumArray[i+1];
            cumulativeValue = (isFirstArrayElement) ?
                lrgNumArray[i] : _addTwoLargeSums(
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
