import { SET_BALANCE, SET_TRANSACTIONS } from '../actions/types';

const INITIAL_STATE = {
    balance: null,
    transactions: null, 
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_BALANCE:
            return { ...state, balance: action.payload};
        case SET_TRANSACTIONS:
            return { ...state, transactions: action.payload };
        default:
            return state;
    }
}