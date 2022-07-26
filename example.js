import {x} from './data.js'
import {index_create} from './index.js'
import {index_search} from './search.js'

let sentence = x
const index = index_create(sentence);
const example_search = index_search(index[0], index[1], 'савольный');
example_search.forEach(e => console.log(e));
