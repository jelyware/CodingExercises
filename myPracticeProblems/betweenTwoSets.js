/*
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER representing the number of
 * all possible target integers.
 * 
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a - array containing factors of at least one target integer
 *  2. INTEGER_ARRAY b - array containing multiples of at least one target integer
 */


function lesserFactorsDivideEvenly(arr, max) {
    /** Helper function for getTotalX() */
    let isLargestFactorATargetInteger = true;
    for (const elem of arr) {
        if (max % elem != 0) {
            isLargestFactorATargetInteger = false;
            break;
        }
    }
    return isLargestFactorATargetInteger;
}

function getTotalX(a, b) {
    /** Return an integer total of target integers that share all given factors and multiples.
     * 
     * Observations: 
     * 1. No integer greater than the smallest multiple in array b could be a target integer because
     * in this case 16 % (any number > 16)) will always yield a remainder.
     * 2. The largest factor of array a might be a multiple of one or more lesser factors, and is
     * guaranteed to be a factor of every multiple given in the b array. Critical base case to check would be
     * that all lesser factors divide evenly into the largest factor. If they do not, then the largest factor
     * cannot be a target integer. Example: a=[3,8] b=[24,48,72] or a=[3,5] b=[45, 15, 30].
     * 3. In considering #1 and #2, the range we care about is from largest factor integer to 
     * smallest multiple integer when determining if the integer in quesiton within that range
     * shares both given factor (from a array) and multiple (from b array).
     * 
     */
    let targetIntegersFound = 0;

    const largestFactor = Math.max(...a);
    const smallestMultiple = Math.min(...b);
    const largestFactorIsATargetInteger = (a, largestFactor);
    
    for (let i = largestFactor; i <= smallestMultiple; i++) {
        // Check if integer (i) shares all given factors and multiples.
        let isATargetInteger = true;
        if ( (i == largestFactor) && !largestFactorIsATargetInteger ) {
            // The largest factor is not a multiple of
            // one or more lesser factors, and therefore cannot
            // be a target integer;
            continue;
        }
        for (const factor of a) {
            // Is factor of i?
            if (i % factor != 0) {
                isATargetInteger = false;
                break;
            }
        }
        for (const multiple of b) {
            // Is multiple of i?
            if (multiple % i != 0) {
                isATargetInteger = false;
                break;
            }
        }
        if (isATargetInteger) {
            targetIntegersFound++;
        }
    }
    return targetIntegersFound;    
}