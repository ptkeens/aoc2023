import { describe, expect, it } from 'bun:test'
import { getScore } from './four'

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
})
