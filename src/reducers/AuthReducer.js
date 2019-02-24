import { SET_TOKEN } from '../actions/types';

const INITIAL_STATE = {
    user: null,
    token: false, 
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return { ...state, token: true };
        default:
            return state;
    }
}