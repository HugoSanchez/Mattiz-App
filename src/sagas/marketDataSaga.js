import { 
    takeLatest,
    select,
    put
} from 'redux-saga/effects';

import { 
    GET_MARKET_DATA 
} from '../actions/types';

import { 
    setGasPriceInReduxState,
    setCurrentEthPriceInReduxState,
    setEthPriceHistoryInReduxState,
    setEthPercentageInReduxState
} from '../actions';

import {
    getEthPrice,
    getHistoricEthPrice
} from '../api/auth';

// Crypto imports
import 'ethers/dist/shims.js'; 
import { ethers } from 'ethers';
import { config } from '../../node_modules/config';

const Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)

const timeframeState = state => state.timeframe;

function* handleHistoricLoad() {
    let time = yield select(timeframeState)
    // Call Nomics API.
    let historicEthPrice = yield getHistoricEthPrice(time.timeframe)
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
    yield* handleMarketDataLoading()
}

function* handleMarketDataLoading() {
    // Get gas price from infura. 
    let gasPrice = yield Provider.getGasPrice();
    // Parse gas price to ether.
    let formatedGasPrice = ethers.utils.formatEther(ethers.utils.bigNumberify(gasPrice * 1.5).toString())
    // Set gas price in redux state.
    yield put(setGasPriceInReduxState({ gasPrice: formatedGasPrice, rawGasPrice: gasPrice}))
}

export default function* watchGetMarketData() {
    // Take 'loadMarketData' action.
    yield takeLatest(GET_MARKET_DATA, handleHistoricLoad);
}

