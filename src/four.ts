import { extractInput } from './util'

type Card = {
    number: Number
    picks: number[]
    winners: number[]
}

export const getScore = (numCorrect: number): number =>
    numCorrect > 0 ? Math.pow(2, numCorrect - 1) : 0

export default () => {
    // stuff
}
