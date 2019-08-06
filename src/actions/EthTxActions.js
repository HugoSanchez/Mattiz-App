import { 
    SET_AMOUNT, 
    SET_ADDRESS, 
    RESET_ETH_TX_STATE,
    SET_LOADING,
    SET_CONFIRMED,
    SET_ETH_RENDER_FORM,
    SEND_TX 
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

export const resetEthTxIntitialState = ( ) => {
    return {
        type: RESET_ETH_TX_STATE,
        payload: null
    };
};

export const setEthRenderForm = bool => {
    return {
        type: SET_ETH_RENDER_FORM,
        payload: bool
    };
};

export const initiateTxSend = ( ) => {
    return {
        type: SEND_TX,
        payload: null
    };
};

export const setLoading = ( ) => {
    return {
        type: SET_LOADING,
        payload: null
    };
};

export const setConfirmed = ( ) => {
    return {
        type: SET_CONFIRMED,
        payload: null
    };
};

