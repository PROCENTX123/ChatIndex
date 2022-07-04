const fs = require('fs');
let rawdata = fs.readFileSync('data.json');
let words = JSON.parse(rawdata);
console.log(words.words[3]);
