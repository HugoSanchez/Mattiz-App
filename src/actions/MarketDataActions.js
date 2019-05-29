import { 
    GET_MARKET_DATA,
    SET_GAS_PRICE,
    SET_CURRENT_ETH_PRICE, 
    SET_ETH_PRICE_HISTORY
} from './types';

export const loadMarketData = () => {
    return {
        type: GET_MARKET_DATA,
        payload: null 
    }
}

export const setGasPriceInReduxState = object => {
    return{
        type: SET_GAS_PRICE,
        payload: object 
    }
}

export const setCurrentEthPriceInReduxState = price => {
    return{
        type: SET_CURRENT_ETH_PRICE,
        payload: price 
    }
}

export const setEthPriceHistoryInReduxState = array => {
    return{
        type: SET_ETH_PRICE_HISTORY,
        payload: array 
    }
}
