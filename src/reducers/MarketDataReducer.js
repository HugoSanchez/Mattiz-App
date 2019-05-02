import { 
    SET_GAS_PRICE,
    SET_CURRENT_ETH_PRICE, 
    SET_ETH_PRICE_HISTORY
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    gasPrice: 0,
    currentEthPrice: 0,
    historicEthPrice: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GAS_PRICE:
            return { ...state, gasPrice: action.payload };
        case SET_CURRENT_ETH_PRICE:
            return { ...state, currentEthPrice: action.payload };
        case SET_ETH_PRICE_HISTORY:
            return { ...state, historicEthPrice: action.payload };
        default:
            return state;
    }
}