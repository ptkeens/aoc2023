import { extractInput } from './util'

// Day 1 part 1
type input = string[]

export const isNumeric = (char: string): boolean => /[0-9]/.test(char)

const replacements = [
    {
        text: 'one',
        value: 1,
    },
    {
        text: 'two',
        value: 2,
    },
    {
        text: 'three',
        value: 3,
    },
    {
        text: 'four',
        value: 4,
    },
    {
        text: 'five',
        value: 5,
    },
    {
        text: 'six',
        value: 6,
    },
    {
        text: 'seven',
        value: 7,
    },
    {
        text: 'eight',
        value: 8,
    },
    {
        text: 'nine',
        value: 9,
    },
]

export const extractValueFromLine = (line: string): number => {
    const onlyDigits = line.split('').filter((c) => isNumeric(c))
    if (onlyDigits.length > 1) {
        return Number.parseInt(
            onlyDigits[0] + onlyDigits[onlyDigits.length - 1]
        )
    } else if (onlyDigits.length === 1) {
        return Number.parseInt(onlyDigits[0] + onlyDigits[0])
    } else {
        throw new Error(
            `Did not find a number in the line ${onlyDigits.join('')}`
        )
    }
}

export const extractNumbersFromText = (line: string): string => {
    const onlyNumbers = []
    for (let i = 0; i < line.length; i++) {
        if (isNumeric(line[i])) {
            onlyNumbers.push(Number.parseInt(line[i]))
        } else {
            for (const replacement of replacements) {
                if (line.substring(i).indexOf(replacement.text) === 0) {
                    onlyNumbers.push(replacement.value)
                    break
                }
            }
        }
    }

    return onlyNumbers.join('')
}

const input = extractInput('day1')

export default () => {
    console.log(`Day 1:`)
    // 1.1
    const part1 = input
        .map((line) => extractValueFromLine(line))
        .reduce((total, value) => (total += value))

    console.log(`1.1: ${part1}`)

    // 1.2
    const part2 = input
        .map((line) => extractNumbersFromText(line))
        .map((line) => extractValueFromLine(line))
        .reduce((total, value) => (total += value))

    console.log(`1.2: ${part2}`)
    console.log()
}
