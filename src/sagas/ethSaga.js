import { 
    takeEvery, 
    put,
    delay,
    select
} from 'redux-saga/effects';

// Types.
import { 
    GET_ETH_BALANCES 
} from '../actions/types';

// Crypto imports
import 'ethers/dist/shims.js'; 
import { ethers } from 'ethers';
import { config } from '../../node_modules/config';

// Actions.
import {
    setEthAddress,
    setEthBalanceInReduxState,
    setEthBalanceInDollars,
    setEthTransactionsInReduxState 
} from '../actions';

// Number parser 
const numeral = require('numeral');

let Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)
let etherscanProvider = new ethers.providers.EtherscanProvider();
let wallet = ethers.Wallet.fromMnemonic(config.seed);
let connectedWallet = new ethers.Wallet(wallet.privateKey, Provider);

const marketData = state => state.marketData;

function* setAddress() {
    // Set address in redux state
    yield put(setEthAddress(wallet.address))
    // Move to next function
    yield* handleEthBalances()
}

function* handleEthBalances() {
    // Get MarketData State.
    let data = yield select(marketData)
    // Get Eth Price. 
    let currentPriceETH = data.currentPriceETH
    // Start loop.
    while (true) {
        // Get Wallet Balance.
        let balance = yield connectedWallet.getBalance()
        // Parse Balance.
        let parsedBalance = ethers.utils.formatEther(ethers.utils.bigNumberify(balance).toString())
        // Dispatch action to set eth balance in state.
        yield put(setEthBalanceInReduxState(parsedBalance))
        // Calculate balance in Dollars.
        let ethDollarBalance = numeral(parsedBalance * currentPriceETH).format('0,0.00') 
        // Dispatch action to set eth balance dollars in state.    
        yield put(setEthBalanceInDollars(ethDollarBalance))
        // Get Wallet Transaction History.
        let txs = yield etherscanProvider.getHistory(wallet.address)
        // Dispatch action to set transactions in state.
        yield put(setEthTransactionsInReduxState(txs))
        // Delay loop for five seconds.
        yield delay(5000)
    }
}

export default function* watchGetMarketData() {
    yield takeEvery(GET_ETH_BALANCES, setAddress)
}

