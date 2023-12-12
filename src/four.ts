import { extractInput } from './util'

type Card = {
    number: Number
    picks: number[]
    truth: number[]
    correct: number[]
    score: number
}

export const defaultCard = (): Card => ({
    number: 0,
    picks: [],
    truth: [],
    correct: [],
    score: 0,
})

export const getScore = (numCorrect: number): number =>
    numCorrect > 0 ? Math.pow(2, numCorrect - 1) : 0

export const parseCard = (input: string): Card => {
    const [game, rest] = input.trim().split(':')
    const [_, num] = game.trim().split(' ')
    const [rawPicks, rawTruth] = rest.trim().split('|')

    const gameNumber = Number.parseInt(num)
    const picks = rawPicks
        .split(' ')
        .map((pick) => Number.parseInt(pick))
        .filter((pick) => !Number.isNaN(pick))
    const truth = rawTruth
        .split(' ')
        .map((truth) => Number.parseInt(truth))
        .filter((truth) => !Number.isNaN(truth))

    const correct = picks.filter((pick) => truth.includes(pick))

    return {
        number: gameNumber,
        picks,
        truth,
        correct,
        score: getScore(correct.length),
    }
}

const part1 = (input: string[]) =>
    input
        .map((line) => parseCard(line))
        .reduce((total, card) => (total += card.score), 0)

const part2 = (input: string[]) => {}

export default () => {
    console.log('Day 4:')
    const input = extractInput('day4')

    //4.1
    const part1Sum = part1(input)
    console.log(`4.1: ${part1Sum}`)

    //4.2
    const count = part2(input)
    console.log(`4.2: tbd`)
    console.log()
}
