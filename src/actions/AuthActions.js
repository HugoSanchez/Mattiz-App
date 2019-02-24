import { SET_TOKEN } from './types';

export const setToken = () => {
    return (dispatch) => {
        setTimeout(dispatch({ type: SET_TOKEN, payload: null }), 1000)
    };
};