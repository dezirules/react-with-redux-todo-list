import React from "react";
import classNames from 'classnames';
import TodoItem from "./TodoItem.jsx";
import {addTodo, checkAll, uncheckAll, clearCompleted} from '../actions/todosActions.js';
import {filter} from '../actions/filterActions.js';
import {constants} from "../utils/constants.js";
import {storage} from '../store/storage.js';
import style from '../css/todolist.scss';

export default class TodoList extends React.Component {

    constructor(props) {
        super(props);

        // get the store from the props
        this.store = this.props.store;

        // initialize the state
        this.state = this.store.getState();

        // create refs
        this.inputTodo = React.createRef();
    }

    componentWillMount(){
        // subscribe to store changes
        this.unsubscribe = this.store.subscribe(function() {
            // update the state
            this.setState(this.store.getState());

            // save store to storage
            storage.setItem(this.store.getState());
        }.bind(this));
    }

    componentDidMount(){
        // focus on input element
        this.inputTodo.current.focus();
    }

    componentWillUnmount(){
        // unsubscribe from store
        this.unsubscribe();
    }

// render
    render() {
        var todos = this.state.todos;

        // filter out todos depending on the selected filter
        if(this.state.filter === constants.ACTIVE) {
            todos = todos.filter(e => !e.checked);
        } else if(this.state.filter === constants.COMPLETED) {
            todos = todos.filter(e => e.checked);
        }

        todos = todos.map(e => <TodoItem todoItem={e} key={e.id} store={this.store}/>);

        return (
            <div className={style.parentContainer}>
                <header className={style.header}>
                    {/* hide the toggle all button when there are no todos */}
                    {!this.todosEmpty() &&
                        <span>
                            <input
                                type="checkbox"
                                id="input-todo"
                                onChange={this.onToggleAll.bind(this)}/>
                            <label htmlFor="input-todo">
                                <i className={classNames("fas fa-angle-down fa-fw", {[style.toggleAll]: !this.noneActive()})}></i>
                            </label>
                        </span>
                    }

                    <input
                        className={classNames(style.inputTodo, {[style.extraPadding]: this.todosEmpty()})}
                        ref={this.inputTodo}
                        onKeyUp={this.onInput.bind(this)}
                        type="text"
                        placeholder="What do you have to do?"/>
                </header>

                <main className={style.main}>
                    <ul>
                        {todos}
                    </ul>
                </main>

                {/* hide footer if there are no todos */}
                {!this.todosEmpty() &&
                    <footer className={style.footer}>
                        <span className={style.todoCount}>{this.countActiveTodos()} {this.countActiveTodos() === 1 ? 'item' : 'items'} left</span>

                        <ul className={style.filterTodos}>
                            <li>
                                <span
                                    className={classNames(style.filterButton, {[style.active]: this.state.filter === constants.ALL})}
                                    onClick={this.onFilterAll.bind(this)}>
                                    All
                                </span>
                            </li>
                            <li>
                                <span
                                    className={classNames(style.filterButton, {[style.active]: this.state.filter === constants.ACTIVE})}
                                    onClick={this.onFilterActive.bind(this)}>
                                    Active
                                </span>
                            </li>
                            <li>
                                <span
                                    className={classNames(style.filterButton, {[style.active]: this.state.filter === constants.COMPLETED})}
                                    onClick={this.onFilterCompleted.bind(this)}>
                                    Completed
                                </span>
                            </li>
                        </ul>

                        <span
                            className={style.clearCompleted}
                            onClick={this.onClearCompleted.bind(this)}>
                            Clear completed
                        </span>
                    </footer>
                }
            </div>
        );
    }

// event handlers
    onInput(event) {
        // if enter was pressed
        if(event.keyCode === 13) {
            // if the input value is not empty
            if(event.target.value !== '') {
                this.store.dispatch(addTodo(event.target.value.trim()));
            }
            // clear the input field
            event.target.value ='';
        }
    }

    onToggleAll() {
        if(this.noneActive()) {
            this.store.dispatch(uncheckAll());
        } else {
            this.store.dispatch(checkAll());
        }
    }

    onClearCompleted() {
        // if no todo is completed don't dispatch the action
        if(!this.allActive()) {
            this.store.dispatch(clearCompleted());
        }
    }

    onFilterAll() {
        // if the filter is already active don't dispatch the action
        if(this.state.filter !== constants.ALL) {
            this.store.dispatch(filter(constants.ALL));
        }
    }

    onFilterActive() {
        // if the filter is already active don't dispatch the action
        if(this.state.filter !== constants.ACTIVE) {
            this.store.dispatch(filter(constants.ACTIVE));
        }
    }

    onFilterCompleted() {
        // if the filter is already active don't dispatch the action
        if(this.state.filter !== constants.COMPLETED) {
            this.store.dispatch(filter(constants.COMPLETED));
        }
    }

// utils
    countActiveTodos() {
        return this.state.todos.reduce((a, e) => (!e.checked) ? ++a : a, 0);
    }

    todosEmpty() {
        return this.state.todos.length === 0;
    }

    allActive() {
        return this.countActiveTodos() === this.state.todos.length;
    }

    noneActive() {
        return this.countActiveTodos() === 0;
    }

    isBeingEdited(){
        for(let e of this.state.todos){
            if(e.editing) {
                return true;
            }
        }
        return false;
    }
}