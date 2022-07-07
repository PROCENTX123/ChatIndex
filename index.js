const fs = require('fs');
const readline = require('readline-sync');
var bitap = require('bitap')

let rawdata = fs.readFileSync('data.json');
var sentence = JSON.parse(rawdata);

// const str_i = readline.question("Введите строку: ");
// let str = 'Норси-транс компания состоящая из людей';
// console.log(str.indexOf(str_i));



//поиск предложений по строке
const str = readline.question("Введите строку: ").toLowerCase();//поиск только по нижнему регистру
//console.log(str);


console.time('Firstway'); //начало таймера
  for (var i = 0; i < 100000; i++){
    let str_sentence = sentence.words[i].toLowerCase();
    //console.log(str_sentence);
    if (bitap(str_sentence, str, 1).length != 0) {
      //console.log(str_sentence);
    }
  }
console.timeEnd('Firstway'); //конец таймера

// let str_c = 'воздевать'
// console.log(bitap(str_c, str, 2));





//console.log(sentence.words); //вывод всего JSON
