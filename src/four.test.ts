import { describe, expect, it } from 'bun:test'
import { getScore, parseCard } from './four'

describe('Day 4', () => {
    describe('getScore', () => {
        it('should return 0 if given 0', () => {
            const result = getScore(0)
            expect(result).toBe(0)
        })

        it('should return 2^n-1 for score', () => {
            for (let i = 1; i <= 10; i++) {
                const expected = Math.pow(2, i - 1)
                const result = getScore(i)
                expect(result).toBe(expected)
            }
        })
    })

    describe('parseCard', () => {
        it('should correctly parse a card', () => {
            const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`
            const result = parseCard(input)
            expect(result).toHaveProperty('number', 1)
            expect(result).toHaveProperty('picks', [41, 48, 83, 86, 17])
            expect(result).toHaveProperty(
                'truth',
                [83, 86, 6, 31, 17, 9, 48, 53]
            )
            expect(result).toHaveProperty('correct', [48, 83, 86, 17])
            expect(result).toHaveProperty('score', 8)
        })

        it('should correclty parse a card with single digits', () => {
            const input = `Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1`
            const result = parseCard(input)
            expect(result).toHaveProperty('number', 3)
            expect(result).toHaveProperty('picks', [1, 21, 53, 59, 44])
            expect(result).toHaveProperty(
                'truth',
                [69, 82, 63, 72, 16, 21, 14, 1]
            )
            expect(result).toHaveProperty('correct', [1, 21])
            expect(result).toHaveProperty('score', 2)
        })

        it('should have 0 score if no matches are picked', () => {
            const input = `Card 5: 11 15 | 83 86  6 31 17  9 48 53`
            const result = parseCard(input)
            expect(result).toHaveProperty('number', 5)
            expect(result).toHaveProperty('picks', [11, 15])
            expect(result).toHaveProperty('correct', [])
            expect(result).toHaveProperty('score', 0)
        })
    })

    describe('test input 1', () => {
        it('should find the answer to the sample puzzle', () => {
            const input = `
                Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
                Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
                Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
                Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
                Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
                Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
            `

            const lines = input.trim().split('\n')
            const cards = lines.map((line) => parseCard(line))
            const sum = cards.reduce((total, card) => (total += card.score), 0)
            expect(sum).toBe(13)
        })
    })
})
