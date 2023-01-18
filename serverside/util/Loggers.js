// const fs = require('fs');
// const util = require('util');


// const fileLog = fs.createWriteStream(__dirname + '/../logs/server.log', { flags: 'w'});
// const logOutput = process.stdout;

// console.log = () =>  {
//     [...arguments].forEach( element => {
//         fileLog.write(util.format(element) + '\n');
//         logOutput.write(util.format(element) + '\n');
//     });
// };

const fs = require('fs');
const util = require('util');
const fileLog = fs.createWriteStream(__dirname + '/server.log', {flags : 'w'});
const ErrorLog = fs.createWriteStream(__dirname + '/Error.log', {flags : 'w'});
const logOutput = process.stdout;

// the flag 'a' will update the stream log at every launch
console.log  = (e) => { 
    fileLog.write(util.format(e) + '\n');
    logOutput.write(util.format(e) + '\n');
};

console.error = (d) => {
     ErrorLog.write(util.format(d) + '\n');
}

module.exports = {console}