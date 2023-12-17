import { it, expect, describe } from 'bun:test'
import {
    isInstructionLine,
    isRangeLine,
    makeRange,
    parseInput,
    parseRangeLine,
} from './five'

describe('Day 5', () => {
    describe('isRangeLine', () => {
        it('should detect if a line is a range line', () => {
            const line = `50 98 2`
            expect(isRangeLine(line)).toBeTrue()
        })

        it('should detect if a line is not a range line', () => {
            const tests = [
                isRangeLine(''),
                isRangeLine(' '),
                isRangeLine('This is a test'),
                isRangeLine('one two three'),
                isRangeLine('seeds: 51 23'),
            ]

            expect(tests.every((res) => !res)).toBeTrue()
        })
    })

    describe('isInstructionLine', () => {
        it('should detect if a line is an instruction line', () => {
            const tests = [
                isInstructionLine(`seeds: 79 14 55 13`),
                isInstructionLine(`seed-to-soil map:`),
            ]
            expect(tests.every((res) => res)).toBeTrue()
        })

        it('should detect if a line is not an instruction line', () => {
            const tests = [
                isInstructionLine(''),
                isInstructionLine(' '),
                isInstructionLine(`50 98 2`),
            ]
        })
    })

    describe('makeRange', () => {
        it('should return a range from start to length-1', () => {
            expect(makeRange(50, 2)).toMatchObject({
                start: 50,
                end: 51,
            })
            expect(makeRange(50, 48)).toMatchObject({
                start: 50,
                end: 97,
            })
        })
    })

    describe('parseRangeLine', () => {
        it('should parse a range line', () => {
            const line = `50 98 2`
            const result = parseRangeLine(line)
            const expected = {
                source: {
                    start: 98,
                    end: 99,
                },
                destination: {
                    start: 50,
                    end: 51,
                },
            }

            expect(result).toMatchObject(expected)
        })
    })

    describe('parseInput', () => {
        it('should parse the demo input', () => {
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

            const parsed = parseInput(demoInput)
            expect(parsed.seeds).toMatchObject([79, 14, 55, 13])
        })
    })
})
