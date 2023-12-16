import { it, expect, describe } from 'bun:test'
import { isInstructionLine, isRangeLine, makeRange } from './five'

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
})
