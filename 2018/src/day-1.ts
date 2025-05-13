/*
* Proudly crafted by Calamity Jane 
* Contact hello@boadicee.com
*/

// External imports 
import * as fs from "fs";
// Internal imports

const rawData :string = fs.readFileSync('2018/inputs/1.txt', 'utf8')

// *************** DATA FORMATTING ***************

const formatData = (data :string) :number[] => data.split(/\n/g).map((el) => +el)

// *************** FIRST EXERCISE ***************

// Sum all frequency changes in the list
const calculateResultingFrequency = (frequencyChangesList :number[]):number =>
    frequencyChangesList.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

console.log(calculateResultingFrequency(formatData(rawData)))

// *************** SECOND EXERCISE ***************

const findFirstFrequencyReachedTwice = (frequencyChangesList :number[]) :number => {
    let frequency :number = 0
    let frequenciesSet :Set<number> = new Set([0])
    // Repeat the list until a frequency is reached twice
    while (true) {
        for (let i = 0; i < frequencyChangesList.length; i++) {
            frequency += frequencyChangesList[i]
            if (frequenciesSet.has(frequency))
                return frequency
            else
                frequenciesSet.add(frequency)
        }
    }
}

console.log(findFirstFrequencyReachedTwice(formatData(rawData)))

