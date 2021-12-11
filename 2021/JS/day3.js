const { readTxtToArray, dataTypes, printSolution } = require('./helpers')

console.clear()
const inputs = readTxtToArray('day3.txt', dataTypes.string)


// ------- PART ONE ------- //

let gammaRate = ''      //the most common bits
let epsilonRate = ''    //the least common bits
const bit1counter = []  //how many bits(1) are in each columns
const numbersAmount = inputs.length 

//init array
for(let i=0; i<inputs[0].length; i++){
    bit1counter.push(0) 
}

//count how many bits(1) are in each columns
for(let j=0; j<inputs.length; j++){

    const binNumber = inputs[j]
    
    for(let i=0; i<binNumber.length; i++){
        const bit = binNumber[i]

        bit1counter[i] += parseInt(bit);
    }
}

//determine gammaRate and epsilonRate
for(let i=0; i<bit1counter.length; i++){

    if(bit1counter[i] > numbersAmount - bit1counter[i]){
        //amtOfBits(1) > amtOfBits(0)
        gammaRate += '1'
        epsilonRate += '0'
    }
    else{
        //amtOfBits(0) > amtOfBits(1)
        gammaRate += '0'
        epsilonRate += '1'
    }

}

//convert binary to decimal
gammaRate = parseInt(gammaRate, 2)
epsilonRate = parseInt(epsilonRate, 2)

printSolution(gammaRate*epsilonRate, 1)





// ------- PART TWO ------- //

const determineLessOrMostCommonArray = (array0, array1, decisionType) => {

    //array0 means array with bits(0) in n-th column
    //array1 means array with bits(1) in n-th column

    //determine which remainingNumbers choose (which array has more or less elements)
    switch(decisionType){

        case 'most-common':
            if(array0.length === array1.length) return array1

            if(array0.length > array1.length) return array0
            else return array1
           
        case 'least-common':
            if(array0.length === array1.length) return array0

            if(array0.length > array1.length) return array1
            else return array0
            
    }
}

const determineRemainingNumbers = (array, colIndex, decisionType) => {

    //recursion based condition
    if(array.length === 1) return array


    const remaining1BitNumbers = []
    const remaining0BitNumbers = []
    
    for(let i=0; i<array.length; i++){

        if(array[i][colIndex] === '1')
            remaining1BitNumbers.push(array[i])
        else
            remaining0BitNumbers.push(array[i])
        
    }

    
    //determine parameters for next iteration
    const nextArray = determineLessOrMostCommonArray(remaining0BitNumbers, remaining1BitNumbers, decisionType)
    const nextColIndx = colIndex + 1


    //call function until array.length !== 1 (recursion)
    return determineRemainingNumbers(nextArray, nextColIndx, decisionType)

}


let oxygenGeneratorRating = determineRemainingNumbers(inputs, 0, 'most-common')
let CO2_ScrubberRating = determineRemainingNumbers(inputs, 0, 'least-common')

//convert binary to decimal
CO2_ScrubberRating = parseInt(CO2_ScrubberRating, 2)
oxygenGeneratorRating = parseInt(oxygenGeneratorRating, 2)

printSolution(oxygenGeneratorRating*CO2_ScrubberRating, 2)

