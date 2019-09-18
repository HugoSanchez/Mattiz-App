import { 
    SET_BALANCE, 
    SET_TRANSACTIONS, 
    LOAD_PLAID_INFO,
} from './types';

export const loadPlaidInfo = () => {
    return {
        type: LOAD_PLAID_INFO
    }
}

export const setBalanceInReduxState = balance => {
    return{
        type: SET_BALANCE,
        payload: balance 
    }
}

export const setTransactionsInReduxState = transactions => {
    return{
        type: SET_TRANSACTIONS,
        payload: transactions 
    }
}

