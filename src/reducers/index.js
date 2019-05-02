import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlaidReducer from './PlaidReducer';
import EthTxReducer from './EthTxReducer';
import EthReducer from './EthReducer';

export default combineReducers({
    auth: AuthReducer,
    plaid: PlaidReducer,
    ethTx: EthTxReducer,
    ethCommon: EthReducer
})