import { 
    SET_ETH_BALANCES, 
    SET_ETH_TRANSACTIONS
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    balance: 0,
    transactions: [], 
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ETH_BALANCES:
            return { ...state, balance: action.payload };
        case SET_ETH_TRANSACTIONS:
            return { ...state, transactions: action.payload };
        default:
            return state;
    }
}