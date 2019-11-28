import {combineReducers} from 'redux'

import AuthReducer from './AuthReducer'
import PlaidReducer from './PlaidReducer'
import EthTxReducer from './EthTxReducer'
import EthReducer from './EthReducer'
import MarketDataReducer from './MarketDataReducer'
import TimeframeReducer from './TimeframeReducer'
import DashboardSelector from './DashSelectorReducer'

export default combineReducers({
	auth: AuthReducer,
	plaid: PlaidReducer,
	ethTx: EthTxReducer,
	ethCommon: EthReducer,
	marketData: MarketDataReducer,
	timeframe: TimeframeReducer,
	dashboard: DashboardSelector,
})
