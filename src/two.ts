/**
 * Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
 * Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
 * Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
 * Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
 * Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
 */

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

export const getTotalCubeCount = (game: Game): CubeSet => {
    const result = defaultSet()
    for (const set of game.sets) {
        result.red += set.red
        result.blue += set.blue
        result.green += set.green
    }

    return result
}

export const parseGame = (line: string): Game => {
    const [gameTitle, sets] = line.split(':')

    return {
        id: Number.parseInt(idFromGameName(gameTitle)),
        sets: parseGameSets(sets),
    }
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

export default () => {
    // stuff
}
