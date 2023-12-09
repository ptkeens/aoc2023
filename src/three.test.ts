import { describe, it, expect } from 'bun:test'
import {
    describeSchematic,
    extractFeatures,
    extractPartNumbers,
    isAdjacentToSymbol,
    isNumeric,
    isValidSymbol,
} from './three'

describe('Day 3', () => {
    const stringTo2dMatrix = (input: string) =>
        input
            .trim()
            .split('\n')
            .map((line) => line.trim().split(''))

    describe('isValidSymbol', () => {
        it('should detect valid sybmols', () => {
            const symbols = `!@#$%^&*()\+=\-_\/\\`
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

        it('should not detect special characters as numeric', () => {
            const chars = '!@#$%^&*()-_=+<>,./?'
            const results = chars.split('').map((chr) => isNumeric(chr))
            expect(results.every((r) => !r)).toBeTrue()
        })
    })

    describe('extractFeatures', () => {
        it('should produce the correct position data for a part in the middle of a row', () => {
            const input = stringTo2dMatrix(`..35.`)
            const extracted = extractFeatures(input)
            expect(extracted.parts[0]).toHaveProperty('value', 35)
            expect(extracted.parts[0]).toHaveProperty('row', 0)
            expect(extracted.parts[0]).toHaveProperty('colStart', 2)
            expect(extracted.parts[0]).toHaveProperty('colEnd', 3)
        })

        it('should produce the correct position data for a part at the start of a row', () => {
            const input = stringTo2dMatrix(`35...`)
            const extracted = extractFeatures(input)
            expect(extracted.parts[0]).toHaveProperty('value', 35)
            expect(extracted.parts[0]).toHaveProperty('row', 0)
            expect(extracted.parts[0]).toHaveProperty('colStart', 0)
            expect(extracted.parts[0]).toHaveProperty('colEnd', 1)
        })

        it('should produce the correct position for a part data at the end of a row', () => {
            const input = stringTo2dMatrix(`...35`)
            const extracted = extractFeatures(input)
            expect(extracted.parts[0]).toHaveProperty('value', 35)
            expect(extracted.parts[0]).toHaveProperty('row', 0)
            expect(extracted.parts[0]).toHaveProperty('colStart', 3)
            expect(extracted.parts[0]).toHaveProperty('colEnd', 4)
        })

        it('should produce the correct position data for a symbol in the middle of a row ', () => {
            const input = stringTo2dMatrix(`..*..`)
            const extracted = extractFeatures(input)
            const symbol = extracted.symbols[0]

            expect(symbol.col).toBe(2)
            expect(symbol.value).toBe('*')
        })
        it('should produce the correct position data for a symbol at the start of a row ', () => {
            const input = stringTo2dMatrix(`*....`)
            const extracted = extractFeatures(input)
            const symbol = extracted.symbols[0]

            expect(symbol.col).toBe(0)
            expect(symbol.value).toBe('*')
        })
        it('should produce the correct position data for a symbol at the end of a row ', () => {
            const input = stringTo2dMatrix(`....*`)
            const extracted = extractFeatures(input)
            const symbol = extracted.symbols[0]

            expect(symbol.col).toBe(4)
            expect(symbol.value).toBe('*')
        })

        it('should extract parts and numbers', () => {
            const input = stringTo2dMatrix(`123...*..45....6`)
            const extracted = extractFeatures(input)

            expect(extracted.rowCount).toBe(1)
            expect(extracted.colCount).toBe(input[0].length)
            expect(extracted.parts).toBeArrayOfSize(3)
            expect(
                extracted.parts.filter((part) => part.value === 123)
            ).toBeArrayOfSize(1)
            expect(
                extracted.parts.filter((part) => part.value === 45)
            ).toBeArrayOfSize(1)
            expect(
                extracted.parts.filter((part) => part.value === 6)
            ).toBeArrayOfSize(1)
            expect(extracted.symbols).toBeArrayOfSize(1)
            expect(
                extracted.symbols.filter((s) => s.value === '*')
            ).toBeArrayOfSize(1)
        })

        it('should extract multiple features on a single line', () => {
            const input = `
                ...*..%..1
                45..123...
                ..11.+..23
            `
            const features = extractFeatures(stringTo2dMatrix(input))
            expect(features.parts).toBeArrayOfSize(5)
            expect(features.symbols).toBeArrayOfSize(3)
        })
    })

    describe('isAdjacentToSymbol', () => {
        it('should detect a symbol directly above or below', () => {
            const inputs = [
                `
                ....*..
                ...123.
                .......
                `,
                `
                .......
                ..*123.
                .......
                `,
                `
                .......
                ...123*
                .......
                `,
                `
                .......
                ...123.
                ....*..
                `,
            ]

            for (const input of inputs) {
                const formatted = stringTo2dMatrix(input)
                const features = extractFeatures(formatted)
                const result = isAdjacentToSymbol({
                    part: features.parts[0],
                    processedResults: features,
                })
                expect(result).toBeTrue()
            }
        })

        it('should detect symbols at a diagonal', () => {
            const inputs = [
                `
                .*.....
                ..123..
                .......
                `,
                `
                .....*.
                ..123..
                .......
                `,
                `
                .......
                ..123..
                .*.....
                `,
                `
                .......
                ..123..
                .....*.
                `,
            ]

            for (const input of inputs) {
                const formatted = stringTo2dMatrix(input)
                const features = extractFeatures(formatted)
                const result = isAdjacentToSymbol({
                    part: features.parts[0],
                    processedResults: features,
                })
                expect(result).toBeTrue()
            }
        })

        it('should handle cases at boundaries', () => {
            const inputs = [
                `
                *......
                123....
                .......
                `,
                `
                ......*
                ....123
                .......
                `,
                `
                .......
                123....
                *......
                `,
                `
                .......
                ....123
                ......*
                `,
            ]

            for (const input of inputs) {
                const formatted = stringTo2dMatrix(input)
                const features = extractFeatures(formatted)
                const result = isAdjacentToSymbol({
                    part: features.parts[0],
                    processedResults: features,
                })
                expect(result).toBeTrue()
            }
        })
    })

    describe('extractPartNumbers', () => {
        it('should extract valid part numbers from a schematic', () => {
            const input = stringTo2dMatrix(`
            467..114..
            ...*......
            ..35..633.
            ......#...
            617*......
            .....+.58.
            ..592.....
            ......755.
            ...$.*....
            .664.598..`)
            const parts = extractPartNumbers(extractFeatures(input))

            expect(parts).toBeArray()
            expect(parts).toBeArrayOfSize(8)
        })
    })

    describe('test input 1', () => {
        it('should find the answer to the sample puzzle', () => {
            const input = stringTo2dMatrix(`
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`)

            const features = extractFeatures(input)
            const parts = extractPartNumbers(features)
            const value = parts.reduce(
                (total, part) => (total += part.value),
                0
            )
            expect(value).toBe(4361)
        })
    })
})
