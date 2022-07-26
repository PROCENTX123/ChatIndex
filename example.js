import {x} from './data.js'
import {index_create} from './index.js'
import {index_search} from './search.js'

let sentence = x
const indexing_map = index_create(sentence);

//0 - мапа слова->похожие слова
//1 - мапа слова->предложения в которых они лежат
const example_search = index_search(indexing_map[0], indexing_map[1], '');
example_search.forEach(e => console.log(e));
