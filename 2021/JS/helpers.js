const fs = require('fs');

const dataTypes = {

    int: 'int',
    float: 'float',
    string: 'string'
}


const readTxtToArray = (filename, dataType) => {

    var array = fs.readFileSync('2021/Inputs/' + filename).toString().split("\n");
    
    //if last element is '\r' or '\n' or '\r\n' remove it
    if(array[array.length-1] === '') array.pop()

    for(let i=0; i<array.length; i++){

        switch(dataType){

            case dataTypes.int:
                array[i] = parseInt(array[i].replace('\r', ''))
                break;

            case dataTypes.float:
                array[i] = parseFloat(array[i].replace('\r', ''))
                break;

            case dataTypes.string:
                array[i] = array[i].replace('\r', '')
                break;
        }
    }

    return array

}

const printSolution = (answer, part) => {

    const headers = {
        1: 'PART ONE',
        2: 'PART TWO'
    }

    console.log(`// ------- ${headers[part]} ------- //`)
    console.log('answer:', answer)
    console.log('\n')
}


//ASYNCHRONOUS
// fs.readFile('file.txt', function(err, data) {
//     if(err) throw err;
//     var array = data.toString().split("\n");
//     for(i in array) {
//         console.log(array[i]);
//     }
// });


module.exports = {
    dataTypes,
    readTxtToArray,
    printSolution,
}
