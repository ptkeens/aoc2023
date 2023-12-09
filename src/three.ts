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

type SchematicDiscoveryResults = {
    rowCount: number
    colCount: number
    parts: Part[]
    symbols: Symbol[]
}

type Schematic = string[][]

const input = extractInput('day3').map((line) => line.split(''))

export const isValidSymbol = (input: string): boolean =>
    /[!@#$%^&*()\+=\-_\/\\]/.test(input)

export const isNumeric = (character: string): boolean => {
    const parsed = Number(character)
    return !Number.isNaN(parsed)
}

export const findPartsNearSymbols = (output: SchematicDiscoveryResults) => {}

export const extractFeatures = (
    input: string[][]
): SchematicDiscoveryResults => {
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
                    inNumber = false
                    currentNumber = ''
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

export const isAdjacentToSymbol = (input: {
    part: Part
    processedResults: SchematicDiscoveryResults
}) => {
    const { part, processedResults } = input

    // get our dimensions
    const minCol = 0
    const maxCol = processedResults.colCount
    const minRow = 0
    const maxRow = processedResults.rowCount

    // determine our boundaries
    const rowAbove = part.row - 1 >= minRow ? part.row - 1 : minRow
    const rowBelow = part.row + 1 <= maxRow ? part.row + 1 : maxRow
    const colLeft = part.colStart - 1 >= minCol ? part.colStart - 1 : minCol
    const colRight = part.colEnd + 1 <= maxCol ? part.colEnd + 1 : maxCol

    const symbolCheck = processedResults.symbols.filter((symbol) => {
        const rowCheck = symbol.row >= rowAbove && symbol.row <= rowBelow
        const colCheck = symbol.col >= colLeft && symbol.col <= colRight

        return rowCheck && colCheck
    })

    return symbolCheck.some((r) => r)
}

export const extractPartNumbers = (
    processed: SchematicDiscoveryResults
): Part[] => {
    const result: Part[] = []
    const { parts, symbols } = processed

    return parts.filter((part) =>
        isAdjacentToSymbol({
            part,
            processedResults: processed,
        })
    )
}

export const describeSchematic = (input: SchematicDiscoveryResults): void =>
    console.log(
        `Engine schematic is ${input.rowCount}x${input.colCount} with ${input.parts.length} parts and ${input.symbols.length} symbols`
    )

export default () => {
    const features = extractFeatures(input)
    describeSchematic(features)
    const extracted = extractPartNumbers(features)
    const total = extracted.reduce((total, part) => (total += part.value), 0)
    console.log(`discovered ${extracted.length} parts!`)
    console.log(`3.1: ${total}`)
}
