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

type Schematic = {
    rowCount: number
    colCount: number
    parts: Part[]
    symbols: Symbol[]
}

const input = extractInput('day3').map((line) => line.split(''))

export const isValidSymbol = (input: string): boolean =>
    /[!@#$%^&*()\+=\-_]/.test(input)

export const isNumeric = (character: string): boolean => /[\d+]/.test(character)

export const findPartsNearSymbols = (output: Schematic) => {}

export const extractFeatures = (input: string[][]): Schematic => {
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
                        colStart: col - numLen,
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
                        colEnd: col - 1,
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

export const describeSchematic = (input: Schematic): void =>
    console.log(
        `Engine schematic is ${input.rowCount}x${input.colCount} with ${input.parts.length} parts and ${input.symbols.length} symbols`
    )

export default () => {
    const extracted = extractFeatures(input)
    describeSchematic(extracted)
}
