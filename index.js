import fs from 'fs';
import readline from 'readline-sync'
import bitap from 'bitap';
import NGrams from 'ngrams-search';
import * as dfd from "danfojs-node"

//чтение данных
let rawdata = fs.readFileSync('data.json');
var sentence = JSON.parse(rawdata);

//количество сообщений
let count = 0;
for(let key in sentence.words){
  count++;
}

//количество элементов в массиве
Array.prototype.count = function(){
    var result = 0;
    for(var i = 0; i < this.length; i++)
        if (this[i] != undefined)
          result++;
    return result;
}

//создание массивов для датафрейма
var arr_sentence = [];
var arr_words = [];
var arr_index_sentence = [];
var arr_index_word = [];
var arr_maximum_last_compare = [];

//создание массива предложений
for (var i = 0; i < count; i++){
  let str_sentence = sentence.words[i].toLowerCase();
  let arr = str_sentence.split(' ');
  arr_sentence.push(arr)
}

//создание отдельно массива слов и массива в порядка предложений в котором находится слово
for (var j = 0; j < count; j++){
  var n = arr_sentence[j].count();
  for (var k = 0; k < n; k++){
    arr_words.push(arr_sentence[j][k]);
    arr_index_sentence.push(j);
  }
}

var m = arr_words.count();
arr_index_word = Array(m).fill(0);
arr_maximum_last_compare = Array(m).fill(0);

//создание датафрейма
let obj_data = {
  words: arr_words,
  ind_sentence: arr_index_sentence,
  word_index: arr_index_word,
  maximum_last_compare: arr_maximum_last_compare
}

let df = new dfd.DataFrame(obj_data);
df.tail(2).print();
