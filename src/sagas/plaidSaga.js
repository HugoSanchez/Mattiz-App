import { takeEvery, put, call } from 'redux-saga/effects';

import { LOAD_PLAID_INFO } from '../actions/types';
import { getBalance, getTransactions } from '../api/auth';
import { setBalanceInReduxState, setTransactionsInReduxState } from '../actions/PlaidActions';

function* handlePlaidLoad() {

    const [balance, transactions] = yield [call(getBalance), call(getTransactions)];
    yield put(setBalanceInReduxState(balance))
    yield put(setTransactionsInReduxState(transactions))
}

export default function* watchPlaidLoad() {
    yield takeEvery(LOAD_PLAID_INFO, handlePlaidLoad)
}