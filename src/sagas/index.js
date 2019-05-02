import { all } from 'redux-saga/effects';
import plaidSaga from './plaidSaga';
import ethTxSaga from './ethTxSaga';
import ethSaga from './ethSaga';
import marketDataSaga from './marketDataSaga';

export default function* rootSaga() {
    yield all([
        plaidSaga(),
        ethSaga(),
        ethTxSaga(),
        marketDataSaga()
        // other sagas to come...
    ])
}