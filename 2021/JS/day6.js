const fs = require('fs');
const {printSolution} = require('./helpers')


// ------- PARSE INPUTS ------- //
const txtLines = fs.readFileSync('2021/Inputs/day6.txt').toString().split('\n')
txtLines.pop()
const lanternfishSchool = txtLines[0].split(',')



// ------- PART ONE ------- //

const lanternfishSchool80 = []

for(let lanternfish of lanternfishSchool){
    //lanternfish === internal timer
    lanternfishSchool80.push(parseInt(lanternfish))
}

//console.log('\n')
//console.log("Initial day: ", JSON.stringify(numberOfLanternfishOnSpecificInternalTimer))
for(let i=1; i<=80; i++){

    let newLanternfish = 0

    for(let j=0; j<lanternfishSchool80.length; j++){

        //lanternfishSchool[j] === internalTimer

        lanternfishSchool80[j] -= 1

        if(lanternfishSchool80[j] < 0){
            lanternfishSchool80[j] = 6
            newLanternfish += 1
        }
    }

    //new Lanternfishes must be added at the end of the day
    for(let i=0; i<newLanternfish; i++){
        lanternfishSchool80.push(8)
    }

    //console.log(`After day ${i}, lanterfishes: ${lanternfishSchool80.length} `)

}

printSolution(lanternfishSchool80.length, 1)



// ------- PART TWO ------- //

const numberOfLanternfishOnSpecificInternalTimer = [0, 0, 0, 0, 0, 0, 0, 0, 0]

//count how many lanternfish have the same internal timer
for(let lanternfish of lanternfishSchool){

    const internalTimer = parseInt(lanternfish)
    numberOfLanternfishOnSpecificInternalTimer[internalTimer] += 1

    //for example: array = [0,124,43,33,55,45,0,0,0]
    //array[0] = 0 -> 0 lanternfish has internal timer equal 0 days
    //array[1] = 124 -> 124 lanternfish has internal timer equal 1 day
    //array[2] = 43 -> 43 lanternfish has internal timer equal 2 days
    
}

// console.log('\n')
// console.log("Initial day: ", JSON.stringify(numberOfLanternfishOnSpecificInternalTimer))
for(let i=1; i<=256; i++){
   
    //shitArrayLeft does 2 things:
    //1) decrease Lanternfish internal timer by 1
    //2) create new Lanternfish with internal timer = 8
    const first = numberOfLanternfishOnSpecificInternalTimer.shift()
    numberOfLanternfishOnSpecificInternalTimer.push(first)

    //to complete all process it is need to:
    //3) reset parent's Lanternfish internal timer to 6
    numberOfLanternfishOnSpecificInternalTimer[6] += first
    
    //console.log(`After ${i} day: `, JSON.stringify(numberOfLanternfishOnSpecificInternalTimer))
}

const lanterfishAmount256 = numberOfLanternfishOnSpecificInternalTimer.reduce((a,b) => a+b, 0)
printSolution(lanterfishAmount256, 2)


