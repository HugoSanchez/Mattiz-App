import { all } from 'redux-saga/effects';
import plaidSaga from './plaidSaga';
import ethTxSaga from './ethTxSaga';

export default function* rootSaga() {
    yield all([
        plaidSaga(),
        ethTxSaga(),
        // other sagas to come...
    ])
}