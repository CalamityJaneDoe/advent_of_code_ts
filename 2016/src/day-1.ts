/*
* Proudly crafted by Calamity Jane 
* Contact hello@boadicee.com
*/

// External imports
import * as fs from "fs";
// Internal imports

// *************** FIRST EXERCISE ***************

type Orientation = 'N' | 'E' | 'S' | 'W';
type Turn =  'R' | 'L'
type Position = { x: number; y: number };

const nextOrientation = {
    N: { R: 'E', L: 'W' },
    S: { R: 'W', L: 'E' },
    E: { R: 'S', L: 'N' },
    W: { R: 'N', L: 'S' },
} as const;

const coordinatesOffsets = {
    N : { x: 0, y: +1 },
    S : { x: 0, y: -1 },
    E : { x: +1, y: 0 },
    W : { x: -1, y: 0 },
} as const;

const getNextOrientation = (currentOrientation :Orientation, direction :Turn) :Orientation =>
    nextOrientation[currentOrientation][direction];

const getOffset = (orientation: Orientation) => coordinatesOffsets[orientation];

const move = (position :Position, currentOrientation :Orientation,
              nextDirection :Turn, blocks :number) :[Position, Orientation] => {
    const nextOrientation :Orientation = getNextOrientation(currentOrientation, nextDirection)
    const offset :Position = getOffset(nextOrientation)
    const newPosition: Position = {
        x: position.x + offset.x * blocks,
        y: position.y + offset.y * blocks,
    };
    return [newPosition, nextOrientation]
}

const calculateBlocksFromEasterBunnyHQ = (movesList: string[]) :number  => {
    let orientation :Orientation = 'N'
    let position :Position = { x: 0, y: 0}
    for (const el of movesList) {
        [position, orientation] = move(position, orientation, el.slice(0, 1) as Turn, Number(el.slice(1)))
    }
    return Math.abs(position.x) + Math.abs(position.y)
}

const rawData :string = fs.readFileSync('2016/inputs/1.txt', 'utf8')
console.log(calculateBlocksFromEasterBunnyHQ(rawData.split(", ")))

// *************** SECOND EXERCISE ***************

const addVisited = (map :Map<number, Set<number>>, x: number, y: number): void => {
    if (!map.has(x)) {
        map.set(x, new Set());
    }
    map.get(x)!.add(y);
};

const hasVisited = (map :Map<number, Set<number>>, x: number, y: number): boolean =>
    map.has(x) && map.get(x)!.has(y);


const findFirstLocationVisitedTwice = (movesList: string[]): number => {
    let orientation: Orientation = 'N';
    let position: Position = { x: 0, y: 0 };
    const visited: Map<number, Set<number>> = new Map()
    addVisited(visited, position.x, position.y); // Add starting position
    for (const move of movesList) {
        const turn = move.slice(0, 1) as Turn;
        const steps = Number(move.slice(1));
        orientation = getNextOrientation(orientation, turn);
        const offset = getOffset(orientation);
        for (let i = 0; i < steps; i++) {
            position.x += offset.x;
            position.y += offset.y;
            if (hasVisited(visited, position.x, position.y)) {
                return Math.abs(position.x) + Math.abs(position.y);
            }
            addVisited(visited, position.x, position.y);
        }
    }
    return -1; // If no location is visited twice
};
console.log(findFirstLocationVisitedTwice(rawData.split(", ")))