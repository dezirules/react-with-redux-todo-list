import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList.jsx';
import store from './store/store.js';
import './icons/fontAwesome.js';

var rootElement = document.querySelector('#react-todo-list');

ReactDOM.render(<TodoList store={store}/>, rootElement);