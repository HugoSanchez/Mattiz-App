import { SET_DASHBOARD } from './types';

export const setDashboardInReduxState = dashboard => {
    return {
        type: SET_DASHBOARD,
        payload: dashboard
    };
};