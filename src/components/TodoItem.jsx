import React from 'react';
import classNames from 'classnames';
import {toggleTodo, deleteTodo, modifyTodo, editingStarted, editingComplete} from '../actions/todosActions.js';
import style from '../css/todolist.scss';

export default class TodoItem extends React.Component{

    constructor(props) {
        super(props);

        // get the store from the props
        this.store = this.props.store;

        // create refs
        this.editTodo = React.createRef();
        this.toggleTodo = React.createRef();
    }

    componentDidUpdate() {
        // if in edit mode
        if(this.props.todoItem.editing) {
            // focus on the todo editing input field
            this.editTodo.current.focus();
            // fill in the todo editing input field with the todo text
            this.editTodo.current.value = this.props.todoItem.text;
        };
    }

// render
    render() {
        return (
            <li className={style.todoRow}>
                <input
                    type="checkbox"
                    ref={this.toggleTodo}
                    id={this.props.todoItem.id}
                    className={style.toggleTodo}
                    checked={this.props.todoItem.checked}
                    onChange={this.onToggle.bind(this)}/>
                {/* label used for customizing the toggle todo checkbox */}
                <label htmlFor={this.props.todoItem.id}>
                    {/* display checked or unchecked checkbox */}
                    {this.props.todoItem.checked ?
                        <span className="fa-layers fa-fw">
                            <i
                                className={classNames("fas fa-check fa-fw", style.faCheckmark)}
                                data-fa-transform="shrink-6">
                            </i>
                            <i className="far fa-square fa-fw"></i>
                        </span>
                        :
                        <i className="far fa-square fa-fw"></i>
                    }
                </label>

                {/* hide the todo text in editing mode */}
                {!this.props.todoItem.editing &&
                    <label
                        onClick={this.onEditingStarted.bind(this)}
                        className={classNames(style.todoText, {[style.todoChecked]: this.props.todoItem.checked})}>
                        {this.props.todoItem.text}
                    </label>
                }

                {/* replace the todo text with the todo editing input field in editing mode */}
                {this.props.todoItem.editing &&
                    <input
                        type="text"
                        className={style.editTodo}
                        ref={this.editTodo}
                        onBlur={this.onEditingLostFocus.bind(this)}
                        onKeyUp={this.onEditingKeyUp.bind(this)}/>
                }

                <span className={style.deleteTodo} onClick={this.onDelete.bind(this)}>
                    <i className="fas fa-times"></i>
                </span>
            </li>
        );
    }

// event handlers
    onToggle() {
        this.store.dispatch(toggleTodo(this.props.todoItem.id));
    }

    onDelete() {
        this.store.dispatch(deleteTodo(this.props.todoItem.id));
    }

    onEditingStarted(event) {
        this.store.dispatch(editingStarted(this.props.todoItem.id));
    }

    onEditingLostFocus(event) {
        // if the edited todo is empty, delete it instead of modifying it
        if(event.target.value === '') {
            this.store.dispatch(deleteTodo(this.props.todoItem.id));
        } else {
            this.store.dispatch(modifyTodo(this.props.todoItem.id, event.target.value.trim()));
        }
    }

    onEditingKeyUp(event) {
        // if enter was pressed, modify the todo
        if(event.keyCode === 13) {
            // if the edited todo is empty, delete it instead of modifying it
            if(event.target.value === '') {
                this.store.dispatch(deleteTodo(this.props.todoItem.id));
            } else {
                this.store.dispatch(modifyTodo(this.props.todoItem.id, event.target.value.trim()));
            }
        // if escape was pressed, cancel editing
        } else if(event.keyCode === 27) {
            this.store.dispatch(editingComplete(this.props.todoItem.id));
        }
    }
}