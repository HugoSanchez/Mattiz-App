import { SET_TOKEN, SET_USER, LOGOUT_USER } from './types';

export const setToken = () => {
    return {
        type: SET_TOKEN,
        payload: null
    };
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const deleteUserFromReduxState = () => {
    return {
        type: LOGOUT_USER,
        payload: null
    }
}