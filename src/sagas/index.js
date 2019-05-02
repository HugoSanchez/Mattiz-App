import { all } from 'redux-saga/effects';
import plaidSaga from './plaidSaga';
import ethTxSaga from './ethTxSaga';
import ethSaga from './ethSaga';

export default function* rootSaga() {
    yield all([
        plaidSaga(),
        ethSaga(),
        ethTxSaga(),
        // other sagas to come...
    ])
}