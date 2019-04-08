import { SET_BALANCE, SET_TRANSACTIONS, LOAD_PLAID_INFO } from '../actions/types';

const INITIAL_STATE = {
    balance: null,
    transactions: null, 
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_BALANCE:
            console.log('BALANCE ACTION PAYLOAD: ', action.payload)
            return { ...state, balance: action.payload}
        case SET_TRANSACTIONS:
            console.log('TRANSACTIONS ACTION PAYLOAD: ', action.payload)
            return { ...state, transactions: action.payload };
        default:
            return state;
    }
}