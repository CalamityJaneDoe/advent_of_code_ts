/*
* Proudly crafted by Calamity Jane 
* Contact hello@boadicee.com
*/

// External imports
import * as fs from "fs";
// Internal imports

// *************** FIRST EXERCISE ***************

/*
Iterate through str and add 1 floor if "(" and -1 floor if ")"
Less straightforward but more readable syntax :
const findTheFloor = (str :string) :number => {
    let floor = 0
    for (const el of str) {
        if (el === '(')
            floor ++
        else
            floor --
    }
    return floor
}
*/
const findTheFloor = (str :string): number =>
    str.split("")
        .reduce((floor :number, el :string) => floor + (el === '(' ? 1 : -1), 0)

let rawData :string = fs.readFileSync('2015/inputs/1.txt', 'utf8')
console.log(findTheFloor(rawData))

// *************** SECOND EXERCISE ***************

const findThePosition = (str :string) :number => {
    let floor :number = 0
    let position :number = 0
    for (const el of str) {
        if (el === '(' && floor >= 0) {
            floor++;
            position++
        } else if (floor >= 0) {
            floor--
            position++
        }
    }
    return position
}

rawData = fs.readFileSync('2015/inputs/1.txt', 'utf8')
console.log(findThePosition(rawData))
