import { 
    takeEvery, 
    put,
    delay
} from 'redux-saga/effects';

import { 
    GET_ETH_BALANCES 
} from '../actions/types';

// Crypto imports
import 'ethers/dist/shims.js'; 
import { ethers } from 'ethers';
import { config } from '../../node_modules/config';

import {
    setEthAddress,
    setEthBalanceInReduxState,
    setEthTransactionsInReduxState 
} from '../actions';

let Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)
let etherscanProvider = new ethers.providers.EtherscanProvider();
let wallet = ethers.Wallet.fromMnemonic(config.seed);
let connectedWallet = new ethers.Wallet(wallet.privateKey, Provider);

function* setAddress() {
    // Set address in redux state
    yield put(setEthAddress(wallet.address))
    // Move to next function
    yield* handleEthBalances()
}

function* handleEthBalances() {
    while (true) {
        // Get Wallet Balance.
        let balance = yield connectedWallet.getBalance()
        // Parse Balance.
        let parsedBalance = ethers.utils.formatEther(ethers.utils.bigNumberify(balance).toString())
        // Dispatch action to set balance in state.
        yield put(setEthBalanceInReduxState(parsedBalance))
        yield console.log('Balance: ', parsedBalance)

        // Get Wallet Transaction History.
        //// let txs = yield etherscanProvider.getHistory(wallet.address)
        // Dispatch action to set transactions in state.
        //// yield put(setEthTransactionsInReduxState(txs))
        yield delay(5000)
    }
}

export default function* watchGetMarketData() {
    yield takeEvery(GET_ETH_BALANCES, setAddress)
}

