import { SET_TOKEN, SET_USER } from './types';

export const setToken = () => {
    return {
        type: SET_TOKEN,
        payload: null
    };
};

export const setUser = (user) => {
    console.log("Seting User in state")
    return {
        type: SET_USER,
        payload: user
    };
};