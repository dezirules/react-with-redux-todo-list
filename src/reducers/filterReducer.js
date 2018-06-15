import {constants} from '../utils/constants.js';

export default function filterReducer(state = constants.ALL, action){

    if(action.type === 'FILTER') {
        state = action.payload || state;
    }

    return state;
}