import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlaidReducer from './PlaidReducer';

export default combineReducers({
    auth: AuthReducer,
    plaid: PlaidReducer
})