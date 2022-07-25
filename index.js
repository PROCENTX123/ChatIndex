import fs from 'fs';
import readline from 'readline-sync'
import bitap from 'bitap';
import NGrams from 'ngrams-search';
import * as dfd from "danfojs-node"

//биграм
var ngram = new NGrams(2);

//чтение данных
var rawdata = fs.readFileSync('data.json');
var sentence = JSON.parse(rawdata);

//количество элементов в массиве
Array.prototype.count = function(){
    var result = 0;
    for(var i = 0; i < this.length; i++)
        if (this[i] != undefined)
          result++;
    return result;
}

//количество сообщений
var count_for = sentence.words.count();

//создание массивов для датафрейма
var arr_sentence = [];
var arr_words = [];
var arr_index_sentence = [];
var arr_index_word = [];
var arr_maximum_last_compare = [];

//создание массива сообщений со словами разделенными по пробелу
for (var i = 0; i < count_for; i++){
  var str_sentence = sentence.words[i].toLowerCase();
  var arr = str_sentence.split(' ');
  arr_sentence.push(arr)
}

//создание отдельно массива слов и массива в порядка предложений в котором находится слово
for (var j = 0; j < count_for; j++){
  var n = arr_sentence[j].count();
  for (var k = 0; k < n; k++){
    arr_words.push(arr_sentence[j][k]);
    arr_index_sentence.push(j);
  }
}

//заполнение массивов индексов слов и максмимального предыдущего индекса нулями
var m = arr_words.count();
arr_index_word = Array(m).fill(0);
arr_maximum_last_compare = Array(m).fill(0);


//составляю мапу слова->предложения
var map_word_sentence = new Map();
map_word_sentence.set(arr_words[0], [arr_index_sentence[0]]);
// console.time('Firstway')
for (var d = 1; d < 1000; d++ ){
  const set_sentence = map_word_sentence.keys()
  var flag_sentence = false
  if (map_word_sentence.has(arr_words[d])){
    let sentence_push = map_word_sentence.get(arr_words[d])
    sentence_push.push(arr_index_sentence[d])
    map_word_sentence.set(arr_words[d], sentence_push)
  }else {
    map_word_sentence.set(arr_words[d], [arr_index_sentence[d]])
  }
  // for (var l of set_sentence){
  //   if (arr_words[d] == l){
  //     let sentence_push = map_word_sentence.get(l);
  //     sentence_push.push(arr_index_sentence[d]);
  //     map_word_sentence.set(l, sentence_push);
  //     flag_sentence = true
  //   }
  // }
  // if (check_sentence = false){
  //   map_word_sentence.set(arr_words[d], [arr_index_sentence[d]])
  // }

}
// console.log(map_word_sentence);

//создание датафрейма
let obj_data = {
  words: arr_words,
  ind_sentence: arr_index_sentence,
  word_index: arr_index_word,
  maximum_last_compare: arr_maximum_last_compare
}

let df = new dfd.DataFrame(obj_data);
//df.print()

// составляю мапу слова->похожие слова
var map_word = new Map();
map_word.set(arr_words[0], [])//сделано для того что бы начались итерации по множеству for (n of set)
for (var o = 1; o < 1000; o++){//вместо 5000 поставить m
  const set_words = map_word.keys()
  for (n of set_words){
    if (arr_words[o] == n ){
      continue
    }
    var n_gram_value = ngram.compare(arr_words[o], n);
    if ((n_gram_value > 0.62) && (n_gram_value != 1)){
      let arr_push = map_word.get(n);
      arr_push.push(arr_words[o])
      map_word.set(n, arr_push)
    }else{
      map_word.set(arr_words[o], [arr_words[o]]);
    }

  }
  //console.log(map_word);
}
// console.log(map_word);
// console.log(map_word_sentence);
// console.log(map_word.size);
// console.log(map_word_sentence.size);
// console.timeEnd("Firstway")
export {map_word, map_word_sentence};


//как доставать ключи из словаря
// map_word.set(1, )
// map_word.set(2, [1,3,4,5])
// map_word.set(3, [0,1,2,3,4,5])
// console.log(map_word.size);
// console.log(map_word.get(1));
// const ar = 1
// let arr_get = map_word.get(1)
// arr_get.add(ar)
// console.log(arr_get);
// const set = map_word.keys()
// var counter = 0
// //console.log(map_word.size);
// for (n of set){
//   //console.log(n);
//   counter++
// }
// console.log(counter);
// console.log(ngram.compare('жневский', 'женский'));//0.62

// const str = readline.question("Введите строку: ").toLowerCase();//поиск только по нижнему регистру
// var map = new Map()
// map.set('колется', 123)
// map.set('лол', 321)
// console.log(map.has(str));
