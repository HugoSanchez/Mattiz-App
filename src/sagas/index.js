import { all } from 'redux-saga/effects';
import plaidSaga from './plaidSaga';
import ethTxSaga from './ethTxSaga';
import ethSaga from './ethSaga';
import ethMarketDataSaga from './ethMarketDataSaga';
import btcMarketDataSaga from './btcMaketDataSaga';
import setEthAmountSaga from './setEthAmountSaga';
import setMaxEth from './setMaxEthSaga';

export default function* rootSaga() {
    yield all([
        plaidSaga(),
        ethSaga(),
        ethTxSaga(),
        ethMarketDataSaga(),
        btcMarketDataSaga(),
        setEthAmountSaga(),
        setMaxEth()
        // other sagas to come...
    ])
}