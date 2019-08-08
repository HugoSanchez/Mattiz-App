import { 
    SEND_TX,
    SET_AMOUNT, 
    SET_ADDRESS, 
    SET_LOADING,
    SET_CONFIRMED,
    SET_AMOUNT_IN_DOLLARS,
    SET_ETH_RENDER_FORM,
    RESET_ETH_TX_STATE,
    INITIATE_SET_AMOUNT
} from './types';

export const initiateSetAmountInReduxState = amount => {
    return {
        type: INITIATE_SET_AMOUNT,
        payload: amount
    };
};

export const setEthAmount = amount => {
    return {
        type: SET_AMOUNT,
        payload: amount
    };
};

export const setEthAmountInDollars = amount => {
    return {
        type: SET_AMOUNT_IN_DOLLARS,
        payload: amount
    };
};

export const setAddressInReduxState = address => {
    return {
        type: SET_ADDRESS,
        payload: address
    };
};

export const resetEthTxIntitialState = () => {
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

export const initiateTxSend = () => {
    return {
        type: SEND_TX,
        payload: null
    };
};

export const setLoading = () => {
    return {
        type: SET_LOADING,
        payload: null
    };
};

export const setConfirmed = () => {
    return {
        type: SET_CONFIRMED,
        payload: null
    };
};

