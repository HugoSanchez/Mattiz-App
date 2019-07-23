import { SET_TIMEFRAME } from '../actions/types';

const INITIAL_STATE = {
    timeframe: 'month', 
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TIMEFRAME:
            return { ...state, timeframe: action.payload}
        default:
            return state;
    }
}