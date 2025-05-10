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
const format_data = (str :string) :[number[], number[]] => {
    // Get rid of noise from raw data (i.e \n)
    const cleaned_data :string[] = str.replaceAll(/\n/g, "   ")
        // Transform from string to string[] and get rid of spaces
        .split("   ")
    // Construct two separated lists
    const even_list :string[] = cleaned_data.filter((_ :string, index :number) :boolean => index % 2 === 0)
    const odd_list :string[] = cleaned_data.filter((_ :string, index :number) :boolean => index % 2 === 1)
    // Convert string[] to ordered number[]
    const even_list_number :number[] = even_list.map((el :string) => +el).sort()
    const odd_list_number :number[] = odd_list.map((el :string) => +el).sort()

    return [even_list_number, odd_list_number]
}

// *************** FIRST EXERCISE ***************

const calculate_distance_between_lists = (first_list :number[], second_list :number[]) :number => {
    let distance_from_lists :number = 0
    let compared_pair :number[]
    // Loop until lists are empty
    while(first_list.length > 0) {
        // Calculate distance from first elements of both ordered lists
        compared_pair = [first_list[0], second_list[0]].sort()
        distance_from_lists += compared_pair[1] - compared_pair[0]
        // Suppress first element of both ordered lists
        first_list.shift()
        second_list.shift()
    }
    return distance_from_lists
}

let raw_data :string = fs.readFileSync('2024/inputs/1.txt', 'utf8')
let formatted_data :[number[], number[]] = format_data(raw_data)
let distance_between_list :number = calculate_distance_between_lists(formatted_data[0], formatted_data[1])
console.log(distance_between_list)

// *************** SECOND EXERCISE ***************

// key : element of the list - value : number of iteration of el within the list
const create_map_from_list = (list :number[]) :Map<number, number> => {
    let map :Map<number, number> = new Map<number, number>();
    list.forEach((el :number) :void  => {
        map.set(el, (map.get(el) ?? 0) + 1);
    })
    return map
}

const calculate_similarity_score = (list :number[], map :Map<number,number>) :number => {
    return list.reduce((score :number, el :number) => score + el * (map.get(el) ?? 0), 0);
}

formatted_data = format_data(raw_data)
console.log(calculate_similarity_score(formatted_data[0], create_map_from_list(formatted_data[1])))