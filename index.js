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
    arr_index_sentence.push([j]);
  }
}


//заполнение массивов индексов слов и максмимального предыдущего индекса нулями
var m = arr_words.count();
arr_index_word = Array(m).fill(0);
arr_maximum_last_compare = Array(m).fill(0);

//console.log(arr_index_sentence[0]);

//проверка уникальность слов
// var word_unique_count = 0
// for (var b = 0; b < m-1; b++){
//   for (var s = b + 1; s < m; s++ ){
//     if (arr_words[b] == arr_words[s]){
//       word_unique_count++
//       console.log(arr_words[b]);
//       //arr_index_sentence[b].push(arr_index_sentence[s])
//     }
//   }
// }
// console.log(word_unique_count);

//создание датафрейма
let obj_data = {
  words: arr_words,
  ind_sentence: arr_index_sentence,
  word_index: arr_index_word,
  maximum_last_compare: arr_maximum_last_compare
}

let df = new dfd.DataFrame(obj_data);
//df.print()

//индексация
let map_word = new Map();
map_word.set(arr_words[0], [])//сделано для того что бы начались итерации по множеству for (n of set)
console.time('Firstway')
for (var o = 1; o < 5000; o++){//вместо 5000 поставить m
  const set = map_word.keys()
  for (n of set){
    if (ngram.compare(arr_words[o], n) > 0.62){
      if (arr_words[o] == n ){
        continue
      }
      let arr_push = map_word.get(n);
      arr_push.push(arr_words[o])
      map_word.set(n, arr_push)
    }else {
      map_word.set(arr_words[o], []);
    }

  }
  //console.log(map_word);
}
console.timeEnd("Firstway")



//как доставать ключи из словаря
// map_word.set(1, )
// map_word.set(2, [1,3,4,5])
// map_word.set(3, [0,1,2,3,4,5])
// console.log(map_word.get(1));
// const ar = 1
// let arr_get = map_word.get(1)
// arr_get.add(ar)
// console.log(arr_get);
const set = map_word.keys()
alert(set.size);
//console.log(map_word.size);
// for (n of set){
//   console.log(n);
// }
// console.log(ngram.compare('привет', 'првет'));//0.62
