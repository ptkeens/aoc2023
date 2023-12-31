import { splitLineBySpaces, stringArrayToInt, extractInput } from './util'

type RangeType = 'source' | 'destination'

type MapEntryRange = {
    start: number
    end: number
}

type MapEntry = Record<RangeType, MapEntryRange>

type MapType =
    | 'seed-to-soil'
    | 'soil-to-fertilizer'
    | 'fertilizer-to-water'
    | 'water-to-light'
    | 'light-to-temperature'
    | 'temperature-to-humidity'
    | 'humidity-to-location'

type DataMap = {
    type: MapType
    ranges: MapEntry[]
}

type Mappings = {
    [K in MapType]: DataMap
}

type Input = {
    seeds: number[]
    maps: Mappings
}

const mapTypes = [
    'seed-to-soil',
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location',
] as const

export const stringToMapType = (str: string): MapType => {
    switch (str) {
        case 'seed-to-soil map':
            return 'seed-to-soil'
        case 'soil-to-fertilizer map':
            return 'soil-to-fertilizer'
        case 'fertilizer-to-water map':
            return 'fertilizer-to-water'
        case 'water-to-light map':
            return 'water-to-light'
        case 'light-to-temperature map':
            return 'light-to-temperature'
        case 'temperature-to-humidity map':
            return 'temperature-to-humidity'
        case 'humidity-to-location map':
            return 'humidity-to-location'
        default:
            throw new Error(`Invalid map type ${str}`)
    }
}

// type constructor helpers
export const makeRange = (start: number, length: number): MapEntryRange => ({
    start,
    end: start + length - 1,
})

export const makeInput = (): Input => ({
    seeds: [],
    maps: makeMappings(),
})

export const makeMappings = () =>
    mapTypes.reduce((coll, type) => {
        coll[type] = makeDataMap(type)
        return coll
    }, {} as Mappings)

export const makeDataMap = (type: MapType): DataMap => ({
    type,
    ranges: [],
})

export const isRangeLine = (line: string) =>
    stringArrayToInt(splitLineBySpaces(line)).length === 3

export const isInstructionLine = (line: string) => line.includes(':')

export const parseRangeLine = (line: string): MapEntry => {
    const [destStart, sourceStart, rangeLength] = stringArrayToInt(
        splitLineBySpaces(line)
    )

    return {
        source: makeRange(sourceStart, rangeLength),
        destination: makeRange(destStart, rangeLength),
    }
}

export const traverseMaps = (mappings: Mappings, input: number) =>
    mapTypes.reduce((output, mapType) => {
        return traverseMap(mappings[mapType], output)
    }, input)

export const traverseMap = (map: DataMap, input: number) => {
    for (const range of map.ranges) {
        if (range.source.start <= input && range.source.end >= input) {
            const diff = input - range.source.start
            return range.destination.start + diff
        }
    }

    return input
}

export const parseInput = (input: string): Input => {
    let instruction: string
    let mapType: MapType
    return input
        .trim()
        .split('\n')
        .reduce((acc, line) => {
            if (isInstructionLine(line)) {
                const [newInstruction, data] = line.split(':')
                instruction = newInstruction.trim()

                if (instruction === 'seeds') {
                    acc['seeds'] = stringArrayToInt(splitLineBySpaces(data))
                } else {
                    mapType = stringToMapType(instruction)
                }
            } else {
                if (line.trim().length > 0) {
                    if (isRangeLine(line)) {
                        const range = parseRangeLine(line)
                        const current = acc.maps[mapType]
                        current.ranges = [...current.ranges, range]
                    }
                }
            }

            return acc
        }, makeInput())
}

export const part1 = (input: string) => {
    const parsed = parseInput(input)
    const results = parsed.seeds.map((input) =>
        traverseMaps(parsed.maps, input)
    )
    return Math.min(...results)
}

export const part2 = (input: string) => {
    const parsed = parseInput(input)
}

export default () => {
    const input = extractInput('day5').join('\n')

    //5.1
    const result1 = part1(input)
    console.log(`5.1: ${result1}`)

    //5.2
    const result2 = part2(input)
    console.log(`5.2: ${result2}`)
}
