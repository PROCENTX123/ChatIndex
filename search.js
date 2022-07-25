import {bigram, trigram, nGram} from 'n-gram';
import {map_word, map_word_sentence} from './index.js'
//import { grams } from './n-gram/index.js'
import fs from 'fs';
import readline from 'readline-sync'
import bitap from 'bitap';
import NGrams from 'ngrams-search';

let rawdata = fs.readFileSync('data.json');
var sentence = JSON.parse(rawdata);

//биграм
var n = new NGrams(2);
//триграм
//var n = new NGrams(3);

//количество сообщений
let count = 0;
for(let key in sentence.words){
  count++;
}
console.log(map_word_sentence);
//поиск подстроки в строке
// const str_i = readline.question("Введите строку: ");
// let str = 'Норси-транс компания состоящая из людей';
// console.log(str.indexOf(str_i));

// //реализация битапа
// const str = readline.question("Введите строку: ").toLowerCase();//поиск только по нижнему регистру
// console.time('Firstway'); //начало таймера
//   for (var i = 0; i < count; i++){
//     let str_sentence = sentence.words[i].toLowerCase();
//     //console.log(str_sentence);
//     if (bitap(str_sentence, str, 2).length != 0) {
//       console.log(str_sentence);
//     }
//   }
// console.timeEnd('Firstway'); //конец таймера


//console.log(sentence.words); //вывод всего JSON


//тесты нграмы

//console.log(trigram('n-gram'));


// const str = readline.question("Введите строку: ").toLowerCase();//поиск только по нижнему регистру
// console.time('Firstway');
// for (var i = 0; i < count; i++){
//   let str_sentence = sentence.words[i].toLowerCase();
//   if (n.compare(str, str_sentence) > 0.5){
//     console.log(str_sentence);
//   }
// }
// console.timeEnd('Firstway');
