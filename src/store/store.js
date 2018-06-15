import {createStore} from 'redux';
import reducers from '../reducers/reducers.js';
import {constants} from '../utils/constants.js';
import {storage} from './storage.js';

var initialState = storage.getItem() || {
    todos: [],
    filter: constants.ALL
};

const store = createStore(reducers, initialState);

export default store;