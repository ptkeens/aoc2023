import { describe, it, expect } from 'bun:test'
import { extractNumbersFromText, extractValueFromLine, isNumeric } from './one'
describe('Day 1', () => {
    describe('isNumeric', () => {
        it('should return true if given a character that represents a number', () => {
            const texts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
            const results = texts.map((chr) => isNumeric(chr))
            const result = results.every((r) => r === true)
            expect(result).toBeTrue()
        })

        it('should return false if not given a number', () => {
            const text =
                'abcdefghijklmnopqrtuvwxyz~!@#$%^&*()-=+`_[]{}|<>,./?;:\'"'
            expect(isNumeric(text)).toBeFalse()
        })
    })

    describe('extractValueFromLine', () => {
        it('will extract the first and last number from text', () => {
            expect(extractValueFromLine(`1two3`)).toBe(13)
            expect(extractValueFromLine(`567`)).toBe(57)
            expect(extractValueFromLine(`zoneight234`)).toBe(24)
        })

        it('will duplicate a number if only 1 is found', () => {
            expect(extractValueFromLine(`every1time`)).toBe(11)
            expect(extractValueFromLine(`xtwone3four`)).toBe(33)
        })
    })

    describe('extractNumbersFromText', () => {
        it('should extract all numbers either represented by text or digit chars from a string', () => {
            expect(extractNumbersFromText(`two1nine`)).toBe('219')
            expect(extractNumbersFromText(`one1two2three3`)).toBe('112233')
        })

        it('should extract textual representations of numbers if characters are shared', () => {
            expect(extractNumbersFromText(`1eightwo`)).toBe('182')
        })
    })

    describe('test input 1', () => {
        it('should solve the test input', () => {
            const src = `
            1abc2
            pqr3stu8vwx
            a1b2c3d4e5f
            treb7uchet
            `

            const res = src
                .split('\n')
                .filter((line) => line.trim().length > 0)
                .map((line) => extractValueFromLine(line))
                .reduce((total, value) => (total += value))
            expect(res).toBe(142)
        })
    })

    describe('test input 2', () => {
        it('should solve the input', () => {
            const src = `
            two1nine
            eightwothree
            abcone2threexyz
            xtwone3four
            4nineeightseven2
            zoneight234
            7pqrstsixteen
            `

            const res = src
                .split('\n')
                .filter((line) => line.trim().length > 0)
                .map((line) => extractNumbersFromText(line))
                .map((line) => extractValueFromLine(line))
                .reduce((total, value) => (total += value))
            expect(res).toBe(281)
        })
    })
})
