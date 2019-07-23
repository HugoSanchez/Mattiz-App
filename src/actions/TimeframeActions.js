import { SET_TIMEFRAME } from './types';

export const setTimeframeinReduxState = timeframe => {
    return {
        type: SET_TIMEFRAME,
        payload: timeframe
    };
};
