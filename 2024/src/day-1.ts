/*
* Proudly crafted by Calamity Jane 
* Contact hello@boadicee.com
*/
// External imports
import * as fs from 'fs';
// Internal imports

// *************** DATA FORMATTING ***************

// 1. Clean the data from all the noise (i.e \n and spaces)
// 2. Transform the raw string in two separated lists of numbers
const formatData = (str :string) :[number[], number[]] => {
    // Get rid of noise from raw data (i.e \n)
    const cleanedData :string[] = str.replaceAll(/\n/g, "   ")
        // Transform from string to string[] and get rid of spaces
        .split("   ")
    // Construct two separated lists
    const evenList :string[] = cleanedData.filter((_ :string, index :number) :boolean => index % 2 === 0)
    const oddList :string[] = cleanedData.filter((_ :string, index :number) :boolean => index % 2 === 1)
    // Convert string[] to ordered number[]
    const evenListNumber :number[] = evenList.map((el :string) => +el).sort()
    const oddListNumber :number[] = oddList.map((el :string) => +el).sort()

    return [evenListNumber, oddListNumber]
}

// *************** FIRST EXERCISE ***************

const calculateDistanceBetweenLists = (firstList :number[], secondList :number[]) :number => {
    let distanceFromLists :number = 0
    let comparedPair :number[]
    // Loop until lists are empty
    while(firstList.length > 0) {
        // Calculate distance from first elements of both ordered lists
        comparedPair = [firstList[0], secondList[0]].sort()
        distanceFromLists += comparedPair[1] - comparedPair[0]
        // Suppress first element of both ordered lists
        firstList.shift()
        secondList.shift()
    }
    return distanceFromLists
}

let rawData :string = fs.readFileSync('2024/inputs/1.txt', 'utf8')
let formattedData :[number[], number[]] = formatData(rawData)
let distanceBetweenLists :number = calculateDistanceBetweenLists(formattedData[0], formattedData[1])
console.log(distanceBetweenLists)

// *************** SECOND EXERCISE ***************

// key : element of the list - value : number of iteration of el within the list
const createMapFromList = (list :number[]) :Map<number, number> => {
    let map :Map<number, number> = new Map<number, number>();
    list.forEach((el :number) :void  => {
        map.set(el, (map.get(el) ?? 0) + 1);
    })
    return map
}

const calculateSimilarityScore = (list :number[], map :Map<number,number>) :number => {
    return list.reduce((score :number, el :number) => score + el * (map.get(el) ?? 0), 0);
}

formattedData = formatData(rawData)
console.log(calculateSimilarityScore(formattedData[0], createMapFromList(formattedData[1])))