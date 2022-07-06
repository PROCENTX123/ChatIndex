var CRC32 = require("crc-32");
const fs = require('fs');
const readline = require('readline-sync');

let rawdata = fs.readFileSync('data.json');
var sentence = JSON.parse(rawdata);

// const str_i = readline.question("Введите строку: ");
// let str = 'Норси-транс компания состоящая из людей';
// console.log(str.indexOf(str_i));


//поиск предложений по строке
const str = readline.question("Введите строку: ");

//перевод в нижний регистр
//let str_low = str.toLowerCase();
//console.log(str_low);

//console.time('Firstway');
for (var i = 0; i < 100000; i++){
  let str_sentence = sentence.words[i];
  if (str_sentence.indexOf(str) != -1){
    console.log(str_sentence);
  }
}
//console.timeEnd('Firstway');


// const data = 'спасибо';
// const data1 = 'спасиба'
// const hash = CRC32.str(data);
// const hash1 = CRC32.str(data1);
// const index1 = Math.abs(hash) % 1000;
// const index2 = Math.abs(hash1) % 1000;
//console.log(index1);
//console.log(index2);




//console.log(sentence.words); //вывод всего JSON
