import { SET_TOKEN, SET_USER, SET_SECRET, LOGOUT_USER } from './types';


export const setTokeninReduxState = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    };
};

export const setUserInReduxState = ( user ) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const setSessionSecretInReduxState = ( secret ) => {
    return {
        type: SET_SECRET,
        payload: secret
    };
};

export const deleteUserFromReduxState = () => {
    return {
        type: LOGOUT_USER,
        payload: null
    }
}