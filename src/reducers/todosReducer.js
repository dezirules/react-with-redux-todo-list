import uuid from 'uuid/v1';

export default function todosReducer(state = [{id: 0, text: '', checked: false, editing: false}], action){

    switch(action.type){
        case 'ADD_TODO':
            state = [...state, {
                id: uuid(),
                text: action.payload,
                checked: false,
                editing: false
            }];
            break;

        case 'TOGGLE_TODO':
            state = state.map(e => {
                if(e.id === action.payload){
                    e.checked = !e.checked;
                }
                return e;
            });
            break;

        case 'DELETE_TODO':
            state = state.filter(e => e.id !== action.payload)
            break;

        case 'EDITING_STARTED':
            state = state.map(e => {
                if(e.id === action.payload){
                    e.editing = true;
                }
                return e;
            });
            break;

        case 'EDITING_COMPLETE':
            state = state.map(e => {
                e.editing = false;
                return e;
            });
            break;

        case 'MODIFY_TODO':
            state = state.map(e => {
                if(e.id === action.payload.id){
                    e.text = action.payload.text;
                    e.editing = false;
                }
                return e;
            });
            break;

        case 'CHECK_ALL':
            state = state.map(e => {
                e.checked = true;
                return e;
            });
            break;

        case 'UNCHECK_ALL':
            state = state.map(e => {
                e.checked = false;
                return e;
            });
            break;

        case 'CLEAR_COMPLETED':
            state = state.filter(e => !e.checked);
            break;

        default:
            break;
    }

    return state;
}