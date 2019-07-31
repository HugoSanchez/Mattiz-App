import { 
    SET_GAS_PRICE,
    SET_CURRENT_ETH_PRICE, 
    SET_ETH_PRICE_HISTORY,
    SET_ETH_PERCENTAGE,
    SET_CURRENT_BTC_PRICE,
    SET_BTC_PRICE_HISTORY,
    SET_BTC_PERCENTAGE
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: null,
    gasPrice: 0,
    rawGasPrice: null,
    currentPriceETH: 0,
    historicPriceETH: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    percentageChangeETH: 0.00,
    currentPriceBTC: 0,
    historicPriceBTC: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    percentageChangeBTC: 0.00,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GAS_PRICE:
            return { ...state, gasPrice: action.payload.gasPrice, rawGasPrice: action.payload.rawGasPrice };
        case SET_CURRENT_ETH_PRICE:
            return { ...state, currentPriceETH: action.payload };
        case SET_ETH_PRICE_HISTORY:
            return { ...state, historicPriceETH: action.payload };
        case SET_ETH_PERCENTAGE:
            return { ...state, percentageChangeETH: action.payload };
        case SET_CURRENT_BTC_PRICE:
            return { ...state, currentPriceBTC: action.payload };
        case SET_BTC_PRICE_HISTORY:
            return { ...state, historicPriceBTC: action.payload };
        case SET_BTC_PERCENTAGE:
            return { ...state, percentageChangeBTC: action.payload };
        default:
            return state;
    }
}