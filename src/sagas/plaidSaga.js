import { takeEvery, put, call, fork } from 'redux-saga/effects';

import { LOAD_PLAID_INFO } from '../actions/types';
import { getBalance, getTransactions } from '../api/auth';
import { 
    setBalanceInReduxState, 
    setTransactionsInReduxState, 
} from '../actions/PlaidActions';

function* handleBalanceLoad() {
    const response = yield call(getBalance);
    yield put(setBalanceInReduxState(JSON.parse(response.balance)))
}

function* handleTransactionLoad() {
    const data = yield call(getTransactions);
    yield put(setTransactionsInReduxState(data.tx));
}

function* handlePlaidLoad() {
    yield fork(handleBalanceLoad)
    yield fork(handleTransactionLoad)
}

export default function* watchPlaidLoad() {
    yield takeEvery(LOAD_PLAID_INFO, handlePlaidLoad)
}