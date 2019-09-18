import { 
    takeLatest,
    select,
    put
} from 'redux-saga/effects';

import { 
    GET_ETH_MARKET_DATA 
} from '../actions/types';

import { 
    setGasPriceInReduxState,
    setCurrentEthPriceInReduxState,
    setEthPriceHistoryInReduxState,
    setEthPercentageInReduxState
} from '../actions';

import {
    getEthPrice,
    getHistoricPrices
} from '../api/auth';

// Crypto imports
import 'ethers/dist/shims.js'; 
import { ethers } from 'ethers';
import { config } from 'config';

// Number parser 
const numeral = require('numeral');

const Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)

const timeframeState = state => state.timeframe;

function* handleHistoricLoad() {
    let time = yield select(timeframeState)
    // Call Nomics API.
    let historicEthPrice = yield getHistoricPrices(time.timeframe, 'ETH')
    // Get the actual price rates from the response.
    let rates = historicEthPrice.data.rates
    // Calculate percentage variation.
    let percentage = (rates[rates.length -1] - rates[0]) / rates[0] * 100
    // Set price array in state.
    yield put(setEthPriceHistoryInReduxState(rates))
    // Set percentage variation in state.
    yield put(setEthPercentageInReduxState(percentage.toFixed(2)))
    // Move to next function.
    yield* handleEthPriceLoad()
}

function* handleEthPriceLoad() {
    // Call cryptonator API. 
    let res = yield getEthPrice()
    // Parse result. 
    let ethPrice = parseFloat(res.data.ticker.price).toFixed(2)
    // Set result in redux state.
    yield put(setCurrentEthPriceInReduxState(ethPrice))
    // Move to next function.
    yield* handlegasPriceAndFees(ethPrice)
}

function* handlegasPriceAndFees(ethPrice) {
    // Get gas price from infura. 
    let gasPrice = yield Provider.getGasPrice();
    // Parse gas price to ether.
    let formatedGasPrice = ethers.utils.formatEther(ethers.utils.bigNumberify(gasPrice * 1.5).toString())
    // Calculate simple transaction fee in dollars.
    let transactionFee = numeral(formatedGasPrice * ethPrice * 21000 ).format('0,0.000')
    // Set gas price and fees in redux state.
    yield put(setGasPriceInReduxState({ 
        gasPrice: formatedGasPrice, 
        rawGasPrice: gasPrice,
        transactionFee: transactionFee,
    }))
}

export default function* watchGetMarketData() {
    // Take 'loadMarketDataETH' action.
    yield takeLatest(GET_ETH_MARKET_DATA, handleHistoricLoad);
}

