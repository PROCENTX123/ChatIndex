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

//поиск подстроки в строке
// const str_i = readline.question("Введите строку: ");
// let str = 'Норси-транс компания состоящая из людей';
// console.log(str.indexOf(str_i));

// //реализация битапа
const str = readline.question("Введите строку: ").toLowerCase();//поиск только по нижнему регистру
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
// console.log(map_word);
var finish_array_sentence = []
// console.log(str);

//индексированная ngram-а
console.time('Firstway')
function search(str){
  if (map_word.has(str)){
    let words_set = map_word.get(str)
    // console.log(words_set);
    for (var c of words_set){
      if (map_word_sentence.has(c)){
        // console.log('вошло');
        let sentence_set = map_word_sentence.get(c)
        for(var search of sentence_set){
          // console.log(search);
          finish_array_sentence.push(search)
        }
      }
    }
  } else {
    let words_set = map_word.keys(str)
    for( var runner_words of words_set){
        var n_gram_index = n.compare(str, runner_words)
        if (n_gram_index > 0.62){
          let words_set = map_word.get(runner_words)
          for (var runner_words_index of words_set){
            let sentence_set = map_word_sentence.get(runner_words_index)
            for(var search_sentence of sentence_set){
              finish_array_sentence.push(search_sentence)
            }
          }
      }
    }
  }
}
//самовольный
search(str);
// console.log(finish_array_sentence);
for (var a of finish_array_sentence){
  console.log(sentence.words[a]);
}
console.timeEnd("Firstway")
