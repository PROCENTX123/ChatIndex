import fs from 'fs';
import readline from 'readline-sync'
import NGrams from 'ngrams-search';

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

//общее количество слов
var m = arr_words.count();


//составляю мапу слова->предложения
function make_map_words_sentence(arr_words, arr_index_sentence){
  var map_word_sentence = new Map();
  map_word_sentence.set(arr_words[0], [arr_index_sentence[0]]);
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
  }
  return map_word_sentence
}


// составляю мапу слова->похожие слова
function make_map_words_similar_words(arr_words){
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
  }
  return map_word
}

var map_word_sentence = make_map_words_sentence(arr_words, arr_index_sentence)
var map_word = make_map_words_similar_words(arr_words)


console.log(map_word_sentence);
export {map_word, map_word_sentence};
