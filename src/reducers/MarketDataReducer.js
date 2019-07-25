import { 
    SET_GAS_PRICE,
    SET_CURRENT_ETH_PRICE, 
    SET_ETH_PRICE_HISTORY,
    SET_ETH_PERCENTAGE
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    gasPrice: 0,
    rawGasPrice: null,
    currentEthPrice: 0,
    historicEthPrice: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    percentageChange: 0.00,
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GAS_PRICE:
            return { ...state, gasPrice: action.payload.gasPrice, rawGasPrice: action.payload.rawGasPrice };
        case SET_CURRENT_ETH_PRICE:
            return { ...state, currentEthPrice: action.payload };
        case SET_ETH_PRICE_HISTORY:
            return { ...state, historicEthPrice: action.payload };
        case SET_ETH_PERCENTAGE:
            return { ...state, percentageChange: action.payload };
        default:
            return state;
    }
}