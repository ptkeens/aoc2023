/**
 * Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
 * Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
 * Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
 * Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
 * Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
 */

import { extractInput } from './util'

export type Cube = 'red' | 'blue' | 'green'
export type CubeSet = Record<Cube, number>
export type Game = {
    id: number
    sets: CubeSet[]
}

const defaultSet = (): CubeSet => ({
    red: 0,
    blue: 0,
    green: 0,
})

const getArrayOfCubeColors = (): Cube[] => ['red', 'green', 'blue']

export const isGamePosibleWithBag = (bag: CubeSet, game: Game): boolean => {
    const cubes = getArrayOfCubeColors()
    const checks = game.sets.map((set) => {
        for (const cube of cubes) {
            if (set[cube] > bag[cube]) {
                return false
            }
        }

        return true
    })

    return checks.every((r) => r === true)
}

export const parseGame = (line: string): Game => {
    const [gameTitle, sets] = line.split(':')

    return {
        id: Number.parseInt(idFromGameName(gameTitle)),
        sets: parseGameSets(sets),
    }
}

export const getMinimumCubesNeededForGame = (game: Game): CubeSet => {
    const result = defaultSet()
    const cubes = getArrayOfCubeColors()
    return game.sets.reduce((minSet, set) => {
        for (const cube of cubes) {
            if (set[cube] > minSet[cube]) {
                minSet[cube] = set[cube]
            }
        }

        return minSet
    }, result)
}

export const getCubePowerSet = (set: CubeSet): number => {
    return set.red * set.blue * set.green
}

export const stringToCube = (str: string): Cube => {
    switch (str) {
        case 'red':
            return 'red'
        case 'blue':
            return 'blue'
        case 'green':
            return 'green'
        default:
            throw new Error(`Cannot convert string value of ${str} to cube!`)
    }
}

export const parseSet = (set: string): CubeSet => {
    const result = defaultSet()

    if (set.length === 0) {
        return result
    }

    const maybeCubes = set.split(',')
    for (const maybeCube of maybeCubes) {
        const splitLine = maybeCube.trim().split(' ')
        const value = Number.parseInt(splitLine[0].trim())
        const key = splitLine[1].trim().toLowerCase()
        result[stringToCube(key)] = value
    }

    return result
}

export const parseGameSets = (sets: string): CubeSet[] =>
    sets.split(';').map((set) => parseSet(set))

export const idFromGameName = (name: string): string => {
    const re = /Game\s(\d+)$/
    const match = name.match(re)
    if (!match) {
        throw new Error(`Unable to extract game # from ${name}!`)
    }

    return match[1]
}

const input = extractInput('day2')

export default () => {
    console.log(`Day 2:`)
    const bag = {
        red: 12,
        blue: 14,
        green: 13,
    }

    const result1 = input
        .map((line) => parseGame(line.trim()))
        .filter((game) => isGamePosibleWithBag(bag, game))
        .reduce((total, game) => (total += game.id), 0)

    console.log(`2.1: ${result1}`)

    const result2 = input
        .map((line) => parseGame(line.trim()))
        .map((game) => getMinimumCubesNeededForGame(game))
        .reduce((total, game) => (total += getCubePowerSet(game)), 0)

    console.log(`2.2 ${result2}`)
    console.log()
}
