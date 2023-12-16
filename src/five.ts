import { splitLineBySpaces, stringArrayToInt } from './util'

type RangeType = 'source' | 'destination'

type MapEntryRange = {
    start: number
    end: number
}

type MapEntry = {
    [K in RangeType]: MapEntryRange
}

type MapType =
    | 'seed-to-soil'
    | 'soil-to-fertilizer'
    | 'fertilizer-to-water'
    | 'water-to-light'
    | 'light-to-temperature'
    | 'temperature-to-humidity'
    | 'humidity-to-location'

type DataMap<MapType> = {
    type: MapType
    ranges: MapEntry[]
}

type Mappings = {
    [K in MapType]: DataMap<MapType>
}

type Input = {
    seeds: number[]
    maps: Mappings
}

const demoInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

export const isRangeLine = (line: string) =>
    stringArrayToInt(splitLineBySpaces(line)).length === 3

export const isInstructionLine = (line: string) => line.includes(':')

export const makeRange = (start: number, length: number): MapEntryRange => ({
    start,
    end: start + length - 1,
})

export const parseRangeLine = (line: string): MapEntry => {
    const [destStart, sourceStart, rangeLength] = stringArrayToInt(
        splitLineBySpaces(line)
    )

    return {
        source: makeRange(sourceStart, rangeLength),
        destination: makeRange(destStart, rangeLength),
    }
}

export const parseInput = (input: string): Input => {
    let instruction
    return input
        .trim()
        .split('\n')
        .reduce((acc, line) => {
            if (isInstructionLine(line)) {
                const [newInstruction, data] = line.split(':')
                instruction = newInstruction.trim()

                if (instruction === 'seeds') {
                    acc['seeds'] = data
                        .split(' ')
                        .map((txt) => Number.parseInt(txt))
                        .filter((num) => !Number.isNaN(num))
                }
            } else {
                // ensure we are not on a space
                if (line.trim().length > 0) {
                    if (isRangeLine(line)) {
                        const range = parseRangeLine(line)
                    }
                }
            }
        }, {} as Input)
}
