import { describe, expect, it } from 'bun:test'
import { splitLineBySpaces, stringArrayToInt } from './util'

describe('utils', () => {
    describe('stringArrayToInt', () => {
        it('should convert a string array into integers', () => {
            const arr = ['123', '456', '789']
            expect(stringArrayToInt(arr)).toMatchObject([123, 456, 789])
        })

        it('should filter out NaN', () => {
            const arr = ['123', 'peter', '456']
            expect(stringArrayToInt(arr)).toMatchObject([123, 456])
        })

        it('should handle spaces', () => {
            const arr = ['123 ', ' 456 ']
            expect(stringArrayToInt(arr)).toMatchObject([123, 456])
        })

        it('should only parse integers', () => {
            const arr = ['123', '456.23', '999']
            expect(stringArrayToInt(arr)).toMatchObject([123, 456, 999])
        })
    })

    describe('splitLinebySpaces', () => {
        it('should split a line by spaces', () => {
            const line = `this has spaces`
            const expected = ['this', 'has', 'spaces']

            expect(splitLineBySpaces(line)).toMatchObject(expected)
        })

        it('should handle multiple spaces', () => {
            const line = `this   has   spaces`
            const expected = ['this', 'has', 'spaces']

            expect(splitLineBySpaces(line)).toMatchObject(expected)
        })
    })
})
