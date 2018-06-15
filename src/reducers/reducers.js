import {combineReducers} from 'redux';
import todosReducer from './todosReducer.js';
import filterReducer from './filterReducer.js';

export default combineReducers({
    todos: todosReducer,
    filter: filterReducer
});