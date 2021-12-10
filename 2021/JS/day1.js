
const { readTxtToArray, dataTypes, printSolution } = require('./helpers');

const inputs = readTxtToArray('day1.txt', dataTypes.int)

//console.clear()

// ------- PART ONE ------- //
let prevDepth
let increasingSequence = 0

for(let i=0; i<=inputs.length; i++){

    const depth = inputs[i]
    
    if(depth > prevDepth) increasingSequence += 1
    prevDepth = depth
    
}

printSolution(increasingSequence, 1)


// ------- PART TWO ------- //
let prevSumOfDepths
let increasingSequence2 = 0
const modulo3 = inputs.length % 3
const maxIndex = inputs.length - modulo3

for(let i=0; i<maxIndex; i++){

    const currSumOfDepths = inputs[i] + inputs[i+1] + inputs[i+2]
    if(currSumOfDepths > prevSumOfDepths) increasingSequence2 += 1
    prevSumOfDepths = currSumOfDepths
}

printSolution(increasingSequence2, 2)


