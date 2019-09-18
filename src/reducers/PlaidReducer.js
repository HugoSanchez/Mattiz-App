import { SET_BALANCE, SET_TRANSACTIONS } from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    balance: '',
    transactions: null, 
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_BALANCE:
            return { ...state, balance: action.payload[0], loading: false};
        case SET_TRANSACTIONS:
            return { ...state, transactions: action.payload };
        default:
            return state;
    }
}