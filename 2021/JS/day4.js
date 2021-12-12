const fs = require('fs');
const { printSolution } = require('./helpers');

const randomNumbers = []
const boards = []
const emptyBoards = []
const tempBoard = []
let lineIndex = 0

// ----- READ DATA ----- //
const txtLines = fs.readFileSync('2021/Inputs/day4.txt').toString().split('\n')
if(txtLines[txtLines.length-1] === '') txtLines.pop()

for(let i=0; i<txtLines.length; i++){

    const line = txtLines[i]

    // ----- parse random numbers ----- //
    if(lineIndex === 0){
        line.split(',').forEach((stringNum) => {
            randomNumbers.push(parseInt(stringNum))
        })
        lineIndex = 1
        continue
    }


    // ----- parse boards ----- //
    if(line === '' || line === ' ' || line === '\n' || line === '\r') continue
    
    //convert each board line from txt to array of integers
    const tempRow = []
    line.split(' ').forEach((stringNum) => {

        if(stringNum !== '')
            tempRow.push(parseInt(stringNum))
    })

    //create tempBoards from arrays of integers
    const tempRowCopy = JSON.parse(JSON.stringify(tempRow))
    tempBoard.push(tempRowCopy)

    if(tempBoard.length >= 5){
        const tempBoardCopy = JSON.parse(JSON.stringify(tempBoard))
        boards.push(tempBoardCopy)
        emptyBoards.push([new Array(5), new Array(5), new Array(5), new Array(5), new Array(5)])
        tempBoard.length = 0
    }
    
}




// ------- HELPERS FUNCTION ------- //


const findNumberPositionOnBoard = (boardIndex, num) => {

    for(let j=0; j<5; j++){
        for(let i=0; i<5; i++){

            if(boards[boardIndex][j][i] === num) return {x: i, y: j}
        }
    }
}

const markFieldInEmptyBoard = (boardIndex, pos) => {
    
    emptyBoards[boardIndex][pos.y][pos.x] = 'X'
}

const checkEmptyBoard = (boardIndex) => {

    //check rows
    for(let i=0; i<5; i++){

        if(emptyBoards[boardIndex][i].toString() === 'X,X,X,X,X')
            return 'win'
    }

    //check columns
    for(let j=0; j<5; j++){

        let col = ''

        for(let i=0; i<5; i++)
            col += emptyBoards[boardIndex][i][j]
            
        if(col === 'XXXXX') return 'win'

    }

    return ''

}


const calculateSumOfUnmarkedNumbers = (boardIndex) => {

    let sum = 0
    for(let j=0; j<5; j++){

        for(let i=0; i<5; i++){

            if(emptyBoards[boardIndex][j][i] != 'X')
                sum += boards[boardIndex][j][i]
        }
    }

    return sum
}


// ------- PART ONE ------- //

let doesBreak = false
for(let j=0; j<randomNumbers.length; j++){

    const calledNum = randomNumbers[j]

    for(let i=0; i<boards.length; i++){

        const pos = findNumberPositionOnBoard(i, calledNum)  //pos = {x: int, y: int}

        if(pos){
            markFieldInEmptyBoard(i, pos)
            const result = checkEmptyBoard(i)
            
            if(result === 'win'){
                
                const sum = calculateSumOfUnmarkedNumbers(i)
                printSolution(sum*calledNum, 1)
                doesBreak = true
                break
            }
        }
    }

    if(doesBreak === true) break
    
}



// ------- PART TWO ------- //

let lastCalledNumber = 0
const winningBoardsIndexes = []

for(let j=0; j<randomNumbers.length; j++){

    const calledNum = randomNumbers[j]

    for(let i=0; i<boards.length; i++){

        if(winningBoardsIndexes.includes(i)) continue

        const pos = findNumberPositionOnBoard(i, calledNum)  //pos = {x: int, y: int}

        if(pos){
            markFieldInEmptyBoard(i, pos)
            const result = checkEmptyBoard(i)
            
            if(result === 'win'){

                winningBoardsIndexes.push(i)
                lastCalledNumber = calledNum
            }
        }
    }
}


const lastWinningBoardIndex = winningBoardsIndexes.pop()
const sum = calculateSumOfUnmarkedNumbers(lastWinningBoardIndex)

printSolution(sum*lastCalledNumber, 2)


