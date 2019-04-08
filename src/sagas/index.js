import { all } from 'redux-saga/effects';
import plaidSaga from './plaidSaga';

export default function* rootSaga() {
    yield all([
        plaidSaga(),
        // other sagas to come...
    ])
}