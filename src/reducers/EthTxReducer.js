import { 
    SET_AMOUNT, 
    SET_ADDRESS,
    RESET_STATE,
    CLEAR_TX_FORM
} from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    amount: '',
    address: null,
    txState: null,
    message: null, 
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AMOUNT:
            return { ...state, amount: action.payload };
        case SET_ADDRESS:
            return { ...state, address: action.payload };
        case CLEAR_TX_FORM:
            return { ...state, address: null, amount: null };
        case RESET_STATE:
            return { ...state, INITIAL_STATE};
        default:
            return state;
    }
}