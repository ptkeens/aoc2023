import { describe, expect, it } from 'bun:test'
import {
    getTotalCubeCount,
    idFromGameName,
    isGamePosibleWithBag,
    parseGame,
    parseGameSets,
    parseSet,
    stringToCube,
} from './two'
import type { Cube } from './two'

describe('Day 2', () => {
    describe('parseSet', () => {
        it('should return the default if input is empty', () => {
            const result = parseSet('')
            expect(result).toHaveProperty('red', 0)
            expect(result).toHaveProperty('blue', 0)
            expect(result).toHaveProperty('green', 0)
        })

        it('should return red cubes if set', () => {
            const input = '8 red'
            const result = parseSet(input)
            expect(result).toHaveProperty('red', 8)
            expect(result).toHaveProperty('blue', 0)
            expect(result).toHaveProperty('green', 0)
        })

        it('should return green cubes if set', () => {
            const input = '8 green'
            const result = parseSet(input)
            expect(result).toHaveProperty('red', 0)
            expect(result).toHaveProperty('blue', 0)
            expect(result).toHaveProperty('green', 8)
        })

        it('should return blue cubes if set', () => {
            const input = '8 blue'
            const result = parseSet(input)
            expect(result).toHaveProperty('red', 0)
            expect(result).toHaveProperty('blue', 8)
            expect(result).toHaveProperty('green', 0)
        })

        it('should return 2 cube sets', () => {
            const input = '1 red, 2 blue'
            const result = parseSet(input)
            expect(result).toHaveProperty('red', 1)
            expect(result).toHaveProperty('blue', 2)
            expect(result).toHaveProperty('green', 0)
        })

        it('should return 3 cube sets', () => {
            const input = '1 red, 2 blue, 3 green'
            const result = parseSet(input)
            expect(result).toHaveProperty('red', 1)
            expect(result).toHaveProperty('blue', 2)
            expect(result).toHaveProperty('green', 3)
        })
    })

    describe('parseGameSets', () => {
        it('should parse a single cube set', () => {
            const input = '6 red, 1 blue, 3 green'
            const result = parseGameSets(input)

            expect(result).toBeArrayOfSize(1)
            expect(result[0]).toHaveProperty('red', 6)
            expect(result[0]).toHaveProperty('green', 3)
            expect(result[0]).toHaveProperty('blue', 1)
        })

        it('should parse multiple cube sets', () => {
            const input = '6 red, 1 blue, 3 green; 1 red, 2 blue, 5 green'
            const result = parseGameSets(input)

            expect(result).toBeArrayOfSize(2)
        })
    })

    describe('stringToCube', () => {
        it('should throw an error when given an invalid string representation of a cube', () => {
            const input = 'orange'
            expect(() => {
                stringToCube(input)
            }).toThrow()
        })

        it('should return the correct cube', () => {
            for (const input of ['red', 'green', 'blue']) {
                expect(stringToCube(input)).toEqual(input as Cube)
            }
        })
    })

    describe('idFromGameName', () => {
        it('should extract the game id', () => {
            const input = 'Game 4'
            const id = idFromGameName(input)
            expect(id).toBe('4')
        })

        it('should throw if it cannot extract the game id', () => {
            const input = 'Game ten'
            expect(() => {
                idFromGameName(input)
            }).toThrow()
        })
    })

    describe('parseGame', () => {
        it('should parse a game', () => {
            const input =
                'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
            const result = parseGame(input)
            expect(result).toHaveProperty('id', 1)
            expect(result.sets).toBeArrayOfSize(3)
        })
    })

    describe('getTotalCubeCount', () => {
        it('should return the total cvube counts', () => {
            const input =
                'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'
            const game = parseGame(input)
            const totals = getTotalCubeCount(game)

            expect(totals).toHaveProperty('red', 23)
            expect(totals).toHaveProperty('blue', 21)
            expect(totals).toHaveProperty('green', 7)
        })
    })

    describe('isGamePossibleWithBag', () => {
        it('should return true if game is possible', () => {
            const input =
                'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
            const game = parseGame(input)
            const bag = {
                red: 10,
                green: 10,
                blue: 10,
            }

            const result = isGamePosibleWithBag(bag, game)
            expect(result).toBeTrue()
        })

        it('should return false if game is not possible', () => {
            const input =
                'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
            const game = parseGame(input)
            const bag = {
                red: 1,
                green: 10,
                blue: 10,
            }

            const result = isGamePosibleWithBag(bag, game)
            expect(result).toBeFalse()
        })
    })

    describe('test input', () => {
        const input = `
            Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
            Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
            Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
            Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `

        const bag = {
            red: 12,
            blue: 14,
            green: 13,
        }

        const result = input
            .split('\n')
            .filter((line) => line.length > 0)
            .map((line) => parseGame(line.trim()))
            .filter((game) => isGamePosibleWithBag(bag, game))
            .reduce((total, game) => (total += game.id), 0)

        expect(result).toBe(8)
    })
})
