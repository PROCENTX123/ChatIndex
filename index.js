import fs from 'fs';
import readline from 'readline-sync'
import bitap from 'bitap';
import NGrams from 'ngrams-search';

//импорт датафрейма
import DataFrame from 'dataframe-js';

//чтение данных
let rawdata = fs.readFileSync('data.json');
var sentence = JSON.parse(rawdata);

const df = new DataFrame(sentence);

console.log(df);
