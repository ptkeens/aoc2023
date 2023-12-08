import { extractInput } from './util'

type Part = {
    value: number
    row: number
    colStart: number
    colEnd: number
}

type Symbol = {
    value: string
    row: number
    col: number
}

type ExtractedData = {
    rowCount: number
    colCount: number
    parts: Part[]
    symbols: Symbol[]
}

const input = extractInput('day3').map((line) => line.split(''))

export const isValidSymbol = (symbol: string): boolean =>
    /[!@#$%^&*()\+=\-_]/.test(symbol)

export const isNumeric = (character: string): boolean => /[\d+]/.test(character)

export const findPartsNearSymbols = (output: ExtractedData) => {}

export const extractDataFromInput = (input: string[][]): ExtractedData => {
    // get dimensions of input
    const numRows = input.length
    const numCols = input[0].length

    const parts: Part[] = []
    const symbols: Symbol[] = []

    // detect symbols
    for (let row = 0; row < numRows; row++) {
        const detectedNumbers = []
        let inNumber = false
        let currentNumber = ''
        for (let col = 0; col <= numCols; col++) {
            // handle end of row stuff
            if (col === numCols) {
                if (inNumber) {
                    const numLen = currentNumber.length
                    parts.push({
                        value: Number.parseInt(currentNumber),
                        row,
                        colStart: col - 1 - numLen,
                        colEnd: col - 1,
                    })
                }
                continue
            }

            if (isNumeric(input[row][col])) {
                // are we already parsing a number?
                inNumber = true
                currentNumber += input[row][col]
            } else {
                if (isValidSymbol(input[row][col])) {
                    symbols.push({
                        value: input[row][col],
                        row,
                        col,
                    })
                }

                // do we have a number we have been tracking?
                if (inNumber) {
                    const numLen = currentNumber.length
                    parts.push({
                        value: Number.parseInt(currentNumber),
                        row,
                        colStart: col - numLen,
                        colEnd: col,
                    })

                    // reset our tracker
                    currentNumber = ''
                    inNumber = false
                }
            }
        }
    }

    return {
        rowCount: numRows,
        colCount: numCols,
        parts,
        symbols,
    }
}

export default () => {
    const extracted = extractDataFromInput(input)
}
