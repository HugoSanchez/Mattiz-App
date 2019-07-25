import { 
    GET_MARKET_DATA,
    SET_GAS_PRICE,
    SET_CURRENT_ETH_PRICE, 
    SET_ETH_PRICE_HISTORY,
    SET_ETH_PERCENTAGE,
} from './types';

export const loadMarketData = timeframe => {
    return {
        type: GET_MARKET_DATA,
        payload: timeframe 
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

export const setEthPercentageInReduxState = percentage => {
    return{
        type: SET_ETH_PERCENTAGE,
        payload: percentage 
    }
}
