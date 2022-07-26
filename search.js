import {x} from './data.js'
import {index_create} from './index.js'
import readline from 'readline-sync'
// import bitap from 'bitap';
import NGrams from 'ngrams-search';

//триграм
//var n = new NGrams(3);

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


//ввод слова
// const str = readline.question("Введите строку: ").toLowerCase();//поиск только по нижнему регистру

function index_search(map_word, map_word_sentence, str){
  //биграм
  let n = new NGrams(2);

  let sentence_for_search = x

  //финальный список предложений
  let finish_array_sentence = []

  // поиск по индексированной ngram-е
  if (map_word.has(str)){
    let words_set = map_word.get(str)
    for (let c of words_set){
      if (map_word_sentence.has(c)){
        let sentence_set = map_word_sentence.get(c)
        for(let search of sentence_set){
          finish_array_sentence.push(search)
        }
      }
    }
  } else {
    let words_set = map_word.keys(str)
    for( let runner_words of words_set){
        let n_gram_index = n.compare(str, runner_words)
        if (n_gram_index > 0.62){
          let words_set = map_word.get(runner_words)
          for (let runner_words_index of words_set){
            let sentence_set = map_word_sentence.get(runner_words_index)
            for(let search_sentence of sentence_set){
              finish_array_sentence.push(search_sentence)
            }
        }
      }
    }
  }
  let printed_sentence = []
  for (let a of finish_array_sentence){
    printed_sentence.push(sentence_for_search.words[a])
  }
  return printed_sentence
}
export {index_search}
