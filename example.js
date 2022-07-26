import {x} from './data.js'
import {index_create} from './index.js'
import {index_search} from './search.js'

let sentence = x
const indexing_map = index_create(sentence);
const example_search = index_search(indexing_map[0], indexing_map[1], 'савольный');
example_search.forEach(e => console.log(e));
