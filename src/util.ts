import { readFileSync } from 'fs'

export const extractInput = (dayName: string) => {
    const data = readFileSync(`./src/inputs/${dayName}.txt`, 'utf-8')
    return data
        .trim()
        .split('\n')
        .filter((line) => line.trim().length > 0)
}

export const stringArrayToInt = (input: string[]): number[] =>
    input
        .map((section) => Number.parseInt(section.trim()))
        .filter((num) => !Number.isNaN(num))

export const splitLineBySpaces = (input: string): string[] =>
    input
        .trim()
        .split(' ')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
