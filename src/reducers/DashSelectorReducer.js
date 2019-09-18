import { SET_DASHBOARD } from '../actions/types';

const INITIAL_STATE = {
    dashboard: 'total', 
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_DASHBOARD:
            return { ...state, dashboard: action.payload}
        default:
            return state;
    }
}