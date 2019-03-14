import { SET_TOKEN, SET_USER, LOGOUT_USER } from './types';


export const setTokeninReduxState = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    };
};

export const setUserInReduxState = ( user ) => {
    console.log('Action: ', user)
    return (dispatch) => {
        dispatch({ 
            type: SET_USER,
            payload: user
        })
    };
};

export const deleteUserFromReduxState = () => {
    return {
        type: LOGOUT_USER,
        payload: null
    }
}