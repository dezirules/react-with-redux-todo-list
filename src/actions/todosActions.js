export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        payload: text
    }
};

export function toggleTodo(id) {
    return {
        type: 'TOGGLE_TODO',
        payload: id
    }
}

export function deleteTodo(id) {
    return {
        type: 'DELETE_TODO',
        payload: id
    }
}

export function editingStarted(id) {
    return {
        type: 'EDITING_STARTED',
        payload: id
    }
};

export function editingComplete() {
    return {
        type: 'EDITING_COMPLETE'
    }
};

export function modifyTodo(id, text) {
    return {
        type: 'MODIFY_TODO',
        payload: {
            id,
            text
        }
    }
}

export function checkAll() {
    return {
        type: 'CHECK_ALL'
    }
}

export function uncheckAll() {
    return {
        type: 'UNCHECK_ALL'
    }
}

export function clearCompleted() {
    return {
        type: 'CLEAR_COMPLETED'
    }
}