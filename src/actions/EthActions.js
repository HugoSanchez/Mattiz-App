import { 
    SET_ETH_ADDRESS,
    GET_ETH_BALANCES,
    SET_ETH_BALANCES,
    SET_ETH_TRANSACTIONS
} from './types';

export const loadEthBalances = () => {
    return {
        type: GET_ETH_BALANCES,
        payload: null 
    }
}

export const setEthAddress = address => {
    return {
        type: SET_ETH_ADDRESS,
        payload: address 
    }
}

export const setEthBalanceInReduxState = balance => {
    return{
        type: SET_ETH_BALANCES,
        payload: balance 
    }
}

export const setEthTransactionsInReduxState = transactions => {
    return{
        type: SET_ETH_TRANSACTIONS,
        payload: transactions 
    }
}