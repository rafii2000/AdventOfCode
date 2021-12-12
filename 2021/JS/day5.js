const fs = require('fs')
const {printSolution} = require('./helpers')


const txtLines = fs.readFileSync('2021/Inputs/day5.txt').toString().split('\n')
if(txtLines[txtLines.length - 1] === '') txtLines.pop()

const ventsCords = []
const ventsCordsLines = []
const ventsCordsDiagonals = []

const oceanFloor = []
let maxX = 0
let maxY = 0



// ----- PARSE INPUTS ----- //

for(let i=0; i<txtLines.length; i++){

    const line = txtLines[i]

    const startCords = line.split(' -> ')[0]
    const endCords = line.split(' -> ')[1]

    const startX = parseInt(startCords.split(',')[0])
    const startY = parseInt(startCords.split(',')[1])
    const endX = parseInt(endCords.split(',')[0])
    const endY = parseInt(endCords.split(',')[1])

    //determine oceanFloor dimension
    // if(startX > maxX) maxX = startX
    // if(endX > maxX) maxX = endX
    // if(startY > maxY) maxY = startY
    // if(endY > maxY) maxY = endY
    
    ventsCords.push({start: {x: startX, y: startY}, end: {x: endX, y: endY}})

    if(startX === endX || startY === endY)
        ventsCordsLines.push({start: {x: startX, y: startY}, end: {x: endX, y: endY} })
    else
        ventsCordsDiagonals.push({start: {x: startX, y: startY}, end: {x: endX, y: endY} })    
}


// ------- HELPERS FUNCTION ------- //

const initializeOceanFloor = () => {

    //ocean floor dimensions were determined in PARSE INPUTS section
    //the result was, maxX = 989 and maxY = 988
    //so for simplicity oceanFloor array dimensions are 1000x1000

    const arrayOfZeros = []
    
    for(let i=0; i<1000; i++){
        arrayOfZeros.push(0)
    }

    oceanFloor.length = 0
    for(let i=0; i<1000; i++){
        oceanFloor.push(JSON.parse(JSON.stringify(arrayOfZeros)))
    }
}

const findOverlappedPoints = () => {

    let overlappedPoints = 0
    for(let j=0; j<1000; j++){

        for(let i=0; i<1000; i++){
            if(oceanFloor[j][i] > 1)
                overlappedPoints += 1
        }
    }

    return overlappedPoints

}




// ------- PART ONE ------- //

initializeOceanFloor()

//mark vents lines and diagonals on oceanFloor
for(let i=0; i<ventsCordsLines.length; i++){

    let startCords = ventsCordsLines[i].start
    let endCords = ventsCordsLines[i].end
    
    //determine increment step: 0 or 1 or -1
    const incrementX = (startCords.x === endCords.x) ? 0 : ((startCords.x < endCords.x) ? 1 : -1)
    const incrementY = (startCords.y === endCords.y) ? 0 : ((startCords.y < endCords.y) ? 1 : -1)

    //forLoopSteps is equal of line/diagonal length
    const xCordsDifference = Math.abs(startCords.x - endCords.x)
    const yCordsDifference = Math.abs(startCords.y - endCords.y)
    const forLoopSteps = (xCordsDifference === 0) ? yCordsDifference : xCordsDifference   //condition for horizontal or vertical lines

    let x = startCords.x
    let y = startCords.y
    
    for(let i=0; i<=forLoopSteps; i++){
        oceanFloor[y][x] += 1
        x += incrementX
        y += incrementY
    }

}

printSolution(findOverlappedPoints(), 1)



// ------- PART TWO ------- //

initializeOceanFloor()

//mark vents lines and diagonals on oceanFloor
for(let i=0; i<ventsCords.length; i++){

    let startCords = ventsCords[i].start
    let endCords = ventsCords[i].end
    
    //determine increment step: 0 or 1 or -1
    const incrementX = (startCords.x === endCords.x) ? 0 : ((startCords.x < endCords.x) ? 1 : -1)
    const incrementY = (startCords.y === endCords.y) ? 0 : ((startCords.y < endCords.y) ? 1 : -1)

    //forLoopSteps is equal of line/diagonal length
    const xCordsDifference = Math.abs(startCords.x - endCords.x)
    const yCordsDifference = Math.abs(startCords.y - endCords.y)
    const forLoopSteps = (xCordsDifference === 0) ? yCordsDifference : xCordsDifference   //condition for horizontal or vertical lines

    let x = startCords.x
    let y = startCords.y
    
    for(let i=0; i<=forLoopSteps; i++){
        oceanFloor[y][x] += 1
        x += incrementX
        y += incrementY
    }

}

printSolution(findOverlappedPoints(), 2)




