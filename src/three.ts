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

// helper functions for determining surrounding pixels
const getRowAbove = (row: number, boundary: number) =>
    row - 1 >= boundary ? row - 1 : boundary
const getRowBelow = (row: number, boundary: number) =>
    row + 1 <= boundary ? row + 1 : boundary
const getColumnLeft = (col: number, boundary: number) =>
    col - 1 >= boundary ? col - 1 : boundary
const getColumnRight = (col: number, boundary: number) =>
    col + 1 <= boundary ? col + 1 : boundary

// determine if a part is adjacent to any symbols
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
    const rowAbove = getRowAbove(part.row, minRow)
    const rowBelow = getRowBelow(part.row, maxRow)
    const colLeft = getColumnLeft(part.colStart, minCol)
    const colRight = getColumnRight(part.colEnd, maxCol)

    const symbolCheck = processedResults.symbols.filter((symbol) => {
        const rowCheck = symbol.row >= rowAbove && symbol.row <= rowBelow
        const colCheck = symbol.col >= colLeft && symbol.col <= colRight

        return rowCheck && colCheck
    })

    return symbolCheck.some((r) => r)
}

// find and return any adjacent parts to a given symbol
export const partsAdjacentToSymbol = (input: {
    symbol: Symbol
    processedResults: SchematicDiscoveryResults
    validParts: Part[]
}) => {
    const { symbol, processedResults, validParts } = input

    // get our dimensions
    const minCol = 0
    const maxCol = processedResults.colCount
    const minRow = 0
    const maxRow = processedResults.rowCount

    // get our adjacent pixels
    const rowAbove = getRowAbove(symbol.row, minRow)
    const rowBelow = getRowBelow(symbol.row, maxRow)
    const colLeft = getColumnLeft(symbol.col, minCol)
    const colRight = getColumnRight(symbol.col, maxCol)

    const adjacentParts = validParts.filter((part) => {
        const rowCheck = part.row >= rowAbove && part.row <= rowBelow
        const colCheck =
            (colLeft <= part.colStart && colRight >= part.colStart) ||
            (colLeft <= part.colStart && colRight >= part.colEnd) ||
            (colLeft >= part.colStart && colRight <= part.colEnd) ||
            (colLeft >= part.colStart &&
                colLeft <= part.colEnd &&
                colRight >= part.colEnd)

        return rowCheck && colCheck
    })

    return adjacentParts
}

export const extractPartNumbers = (
    processed: SchematicDiscoveryResults
): Part[] => {
    const { parts } = processed

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

const part1 = () => {
    const features = extractFeatures(input)
    describeSchematic(features)
    const extracted = extractPartNumbers(features)
    const total = extracted.reduce((total, part) => (total += part.value), 0)
    console.log(`discovered ${extracted.length} parts!`)
    console.log(`3.1: ${total}`)
}

const part2 = () => {
    const features = extractFeatures(input)
    const extracted = extractPartNumbers(features)
    const results = features.symbols
        .filter((sym) => sym.value === '*')
        .map((sym) =>
            partsAdjacentToSymbol({
                symbol: sym,
                processedResults: features,
                validParts: extracted,
            })
        )
        .filter((parts) => parts.length === 2)
        .reduce(
            (total, adjacentParts) =>
                (total += adjacentParts[0].value * adjacentParts[1].value),
            0
        )
    console.log(`3.2: ${results}`)
}

export default () => {
    console.log('Day 3:')
    part1()
    part2()
    console.log()
}
