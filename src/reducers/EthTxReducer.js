import { 
    SET_AMOUNT, 
    SET_ADDRESS,
    SET_LOADING,
    SET_CONFIRMED,
    SET_AMOUNT_IN_DOLLARS,
    SET_ETH_RENDER_FORM,
    RESET_ETH_TX_STATE,
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    confirmed: false,
    amount: 0,
    amountInDollars: 0,
    address: null,
    showSendForm: false,
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AMOUNT:
            return { ...state, amount: action.payload };
        case SET_ADDRESS:
            return { ...state, address: action.payload };
        case SET_LOADING:
            return { ...state, loading: true };
        case SET_CONFIRMED:
            return { ...state, confirmed: true, loading: false };
        case SET_AMOUNT_IN_DOLLARS:
            return { ...state, amountInDollars: action.payload };
        case SET_ETH_RENDER_FORM:
            return { ...state, showSendForm: action.payload };
        case RESET_ETH_TX_STATE:
            return { 
                ...state, 
                loading: false, 
                confirmed: false, 
                amount: 0, 
                address: null,
                showSendForm: false 
            };
        default:
            return state;
    }
}