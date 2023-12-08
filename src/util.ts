import { readFileSync } from 'fs'

export const extractInput = (dayName: string) => {
    const data = readFileSync(`./src/inputs/${dayName}.txt`, 'utf-8')
    return data
        .trim()
        .split('\n')
        .filter((line) => line.trim().length > 0)
}
