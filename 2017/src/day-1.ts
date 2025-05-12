/*
* Proudly crafted by Calamity Jane 
* Contact hello@boadicee.com
*/
// External imports
import * as fs from "fs";
// Internal imports

const rawData :string = fs.readFileSync('2017/inputs/1.txt', 'utf8')

// *************** DATA FORMATTING ***************

// Return a list of numbers from a list of strings
const formatData = (list :string[]) :number[] => list.map((el) => +el)

// *************** FIRST EXERCISE ***************

// Return the sum of all digits that match their next one within the list
// The last digit in the list is compared with the first one
const sumDigitsThatMatchesTheNextOne = (digitsList :number[]) :number => {
    let accumulator :number = 0
    for (const [idx, _] of digitsList.entries()) {
            // % allows circularity within the list treatment
            const comparedDigitIdx :number = (idx+1) % digitsList.length
            if (digitsList[comparedDigitIdx] === digitsList[idx])
                accumulator += digitsList[idx]
        }
    return accumulator
}

console.log(sumDigitsThatMatchesTheNextOne(formatData(rawData.split(''))))

// *************** SECOND EXERCISE ***************

// Return the sum of all digits that match the digit situated at +length/2 idx in the list
// The last digit in the list is compared with the digit situated at +length/2 idx in the beginning of the list
const sumDigitsThatMatchesDigitHalfwayAround = (digitsList :number[]) :number => {
    // Check if list length is even
    if (digitsList.length % 2 !== 0) return -1

    let accumulator: number = 0
    for (const [idx, _] of digitsList.entries()) {
        // % allows circularity within the list treatment
        const comparedDigitIdx :number = (idx + digitsList.length / 2) % digitsList.length
        if (digitsList[comparedDigitIdx] === digitsList[idx])
            accumulator += digitsList[idx]
    }

    return accumulator
}

console.log(sumDigitsThatMatchesDigitHalfwayAround(formatData(rawData.split(''))))