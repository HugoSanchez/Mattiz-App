import { 
    SET_AMOUNT, 
    SET_ADDRESS,
    SET_LOADING,
    SET_CONFIRMED,
    RESET_STATE,
    CLEAR_TX_FORM,
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    confirmed: false,
    amount: 0,
    address: null,
    txState: null,
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
            return { ...state, confirmed: true };
        case CLEAR_TX_FORM:
            return { ...state, address: null, amount: 0 };
        case RESET_STATE:
            return { ...state, INITIAL_STATE};
        default:
            return state;
    }
}