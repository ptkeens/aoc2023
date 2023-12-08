import { describe, it, expect } from 'bun:test'
import { extractDataFromInput, isNumeric, isValidSymbol } from './three'

describe('Day 3', () => {
    describe('isValidSymbol', () => {
        it('should detect valid sybmols', () => {
            const symbols = `!@#$%^&*()\+=\-_`
            const results = symbols.split('').map((sym) => isValidSymbol(sym))
            expect(results.every((r) => r)).toBeTrue()
        })

        it('should not detect a period', () => {
            const symbol = '.'
            const result = isValidSymbol(symbol)
            expect(result).toBeFalse()
        })
    })

    describe('isNumeric', () => {
        it('should detect numbers', () => {
            const numbers = '0123456789'
            const results = numbers.split('').map((num) => isNumeric(num))
            expect(results.every((r) => r)).toBeTrue()
        })

        it('should not detect a character as numeric', () => {
            const chars = 'abcdefghijklmnopqrstuvwxyz'
            const results = chars.split('').map((chr) => isNumeric(chr))
            expect(results.every((r) => !r)).toBeTrue()
        })
    })

    describe('extractDataFromInput', () => {
        it('should extract parts and numbers', () => {
            const input = [`123...*..45....6`.split('')]
            const extracted = extractDataFromInput(input)

            expect(extracted.rowCount).toBe(1)
            expect(extracted.colCount).toBe(input[0].length)
            expect(extracted.parts).toBeArrayOfSize(3)
            expect(extracted.symbols).toBeArrayOfSize(1)
        })
    })

    describe('test input 1', () => {
        const input = `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`
    })
})
