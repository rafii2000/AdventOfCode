const fs = require('fs')
const {printSolution} = require('./helpers')

console.clear()

const inputs = fs.readFileSync('2021/Inputs/day2.txt').toString().split('\n')
if(inputs[inputs.length-1] === '') inputs.pop()


// ------- PART ONE ------- //

let submarineX = 0  //forward
let submarineY = 0  //down, up

for(let i=0; i<inputs.length; i++){

    const command = inputs[i].split(' ')
    const direction = command[0]
    const units = parseInt(command[1])
   
    switch(direction){

        case 'forward':
            submarineX += units
            break
        
        case 'down':
            submarineY += units
            break

        case 'up':
            submarineY -= units
            break
    }

}

printSolution(submarineX*submarineY, 1)



// ------- PART TWO ------- //

let aim = 0
let horizontal = 0  //horizontal
let depth = 0  //depth

for(let i=0; i<inputs.length; i++){

    const command = inputs[i].split(' ')
    const direction = command[0]
    const units = parseInt(command[1])

    switch(direction){

        case 'forward':
            horizontal += units
            depth += (units*aim)
            break

        case 'down':
            aim += units
            break

        case 'up':
            aim -= units
            break
    }

}

printSolution(horizontal*depth, 2)
