import { 
    SET_AMOUNT, 
    SET_ADDRESS, 
    RESET_STATE,
    CLEAR_TX_FORM 
} from './types';


export const setAmountInReduxState = (amount) => {
    return {
        type: SET_AMOUNT,
        payload: amount
    };
};

export const setAddressInReduxState = ( address ) => {
    return {
        type: SET_ADDRESS,
        payload: address
    };
};

export const resetIntitialState = ( ) => {
    return {
        type: RESET_STATE,
        payload: null
    };
};

export const clearTxForm = ( ) => {
    return {
        type: CLEAR_TX_FORM,
        payload: null
    };
};

