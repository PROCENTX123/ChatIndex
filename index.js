const fs = require('fs');
const readline = require('readline-sync');
var bitap = require('bitap')

let rawdata = fs.readFileSync('data.json');
var sentence = JSON.parse(rawdata);

// const str_i = readline.question("Введите строку: ");
// let str = 'Норси-транс компания состоящая из людей';
// console.log(str.indexOf(str_i));



//перевод в нижний регистр
//let str_low = str.toLowerCase();
//console.log(str_low);

//поиск предложений по строке
// const str = readline.question("Введите строку: ");

//console.time('Firstway'); //начало таймера
  // for (var i = 0; i < 100000; i++){
  //   let str_sentence = sentence.words[i];
  //   if (str_sentence.indexOf(str) != -1){
  //     console.log(str_sentence);
  //   }
  // }
//console.timeEnd('Firstway'); //конец таймера

console.log(bitap('космический', 'комич', 2));




//console.log(sentence.words); //вывод всего JSON
