import {x} from './data.js'
import {map_word, map_word_sentence} from './index.js'
import fs from 'fs';
import readline from 'readline-sync'
// import bitap from 'bitap';
import NGrams from 'ngrams-search';

var sentence = x;
console.log("я в браузере");
//биграм
var n = new NGrams(2);
//триграм
//var n = new NGrams(3);

//ввод слова
// const str = readline.question("Введите строку: ").toLowerCase();//поиск только по нижнему регистру



//количество сообщений
// let count = 0;
// for(let key in sentence.words){
//   count++;
// }
//реализация битапа
// console.time('Firstway'); //начало таймера
//   for (var i = 0; i < count; i++){
//     let str_sentence = sentence.words[i].toLowerCase();
//     //console.log(str_sentence);
//     if (bitap(str_sentence, str, 2).length != 0) {
//       console.log(str_sentence);
//     }
//   }
// console.timeEnd('Firstway'); //конец таймера

//финальный список предложений
var finish_array_sentence = []

//поиск по индексированной ngram-е
// console.time('Firstway')
// function search(str){
//   if (map_word.has(str)){
//     let words_set = map_word.get(str)
//     for (var c of words_set){
//       if (map_word_sentence.has(c)){
//         let sentence_set = map_word_sentence.get(c)
//         for(var search of sentence_set){
//           finish_array_sentence.push(search)
//         }
//       }
//     }
//   } else {
//     let words_set = map_word.keys(str)
//     for( var runner_words of words_set){
//         var n_gram_index = n.compare(str, runner_words)
//         if (n_gram_index > 0.62){
//           let words_set = map_word.get(runner_words)
//           for (var runner_words_index of words_set){
//             let sentence_set = map_word_sentence.get(runner_words_index)
//             for(var search_sentence of sentence_set){
//               finish_array_sentence.push(search_sentence)
//             }
//         }
//       }
//     }
//   }
// }
//
// search(str);
// for (var a of finish_array_sentence){
//   console.log(sentence.words[a]);
// }
// console.timeEnd("Firstway")
