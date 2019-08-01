import { 
    takeEvery, 
    put 
} from 'redux-saga/effects';

import { 
    GET_ETH_BALANCES 
} from '../actions/types';

// Crypto imports
import 'ethers/dist/shims.js'; 
import { ethers } from 'ethers';
import { config } from '../../node_modules/config';

import { 
    setEthBalanceInReduxState,
    setEthTransactionsInReduxState 
} from '../actions';

let Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)
let etherscanProvider = new ethers.providers.EtherscanProvider();
let wallet = ethers.Wallet.fromMnemonic(config.seed);
let connectedWallet = new ethers.Wallet(wallet.privateKey, Provider);

function* handleEthBalances() {
    // Get Wallet Balance.
    let balance = yield connectedWallet.getBalance()
    // Parse Balance.
    let parsedBalance = ethers.utils.formatEther(ethers.utils.bigNumberify(balance).toString())
    console.log('Balance: ', parsedBalance)
    // Dispatch action to set balance in state.
    yield put(setEthBalanceInReduxState(parsedBalance))
    // Get Wallet Transaction History.
    let txs = yield etherscanProvider.getHistory(wallet.address)
    // Dispatch action to set transactions in state.
    yield put(setEthTransactionsInReduxState(txs))
}

export default function* watchGetMarketData() {
    yield takeEvery(GET_ETH_BALANCES, handleEthBalances)
}

