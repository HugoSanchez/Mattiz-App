import { SET_TOKEN, SET_USER, LOGOUT_USER } from '../actions/types';

const INITIAL_STATE = {
    user: {name: 'Pepito', password: 'superSecretPassword'},
    token: false, 
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload}
        case SET_TOKEN:
            return { ...state, token: action.payload };
        case LOGOUT_USER:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
}