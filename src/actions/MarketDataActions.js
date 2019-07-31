import { 
    GET_ETH_MARKET_DATA,
    GET_BTC_MARKET_DATA,

    SET_GAS_PRICE,
    SET_CURRENT_ETH_PRICE, 
    SET_ETH_PRICE_HISTORY,
    SET_ETH_PERCENTAGE,

    SET_CURRENT_BTC_PRICE,
    SET_BTC_PRICE_HISTORY,
    SET_BTC_PERCENTAGE
} from './types';

export const loadMarketDataETH = timeframe => {
    return {
        type: GET_ETH_MARKET_DATA,
        payload: timeframe 
    }
}

export const loadMarketDataBTC = timeframe => {
    return {
        type: GET_BTC_MARKET_DATA,
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

export const setCurrentBtcPriceInReduxState = price => {
    return{
        type: SET_CURRENT_BTC_PRICE,
        payload: price 
    }
}

export const setBtcPriceHistoryInReduxState = array => {
    return{
        type: SET_BTC_PRICE_HISTORY,
        payload: array 
    }
}

export const setBtcPercentageInReduxState = percentage => {
    return{
        type: SET_BTC_PERCENTAGE,
        payload: percentage 
    }
}
