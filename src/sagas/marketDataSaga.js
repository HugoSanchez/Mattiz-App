import { 
    takeEvery, 
    put
} from 'redux-saga/effects';

import { 
    GET_MARKET_DATA 
} from '../actions/types';

import { 
    setGasPriceInReduxState,
    setCurrentEthPriceInReduxState,
    setEthPriceHistoryInReduxState 
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

function* handleHistoricLoad() {
    // Call Nomics API.
    let historicEthPrice = yield getHistoricEthPrice()
    // Set price array in state.
    yield put(setEthPriceHistoryInReduxState(historicEthPrice.data.rates))
}

function* handleEthPriceLoad() {
    // Call cryptonator API. 
    let res = yield getEthPrice()
    // Parse result. 
    let ethPrice = parseFloat(res.data.ticker.price).toFixed(2)
    // Set result in redux state.
    yield put(setCurrentEthPriceInReduxState(ethPrice))
    // Move to next function.
    yield* handleHistoricLoad()
}

function* handleMarketDataLoading() {
    // Get gas price from infura. 
    let gasPrice = yield Provider.getGasPrice();
    // Parse gas price to ether.
    let formatedGasPrice = ethers.utils.formatEther(ethers.utils.bigNumberify(gasPrice * 1.5).toString())
    // Set gas price in redux state.
    yield put(setGasPriceInReduxState({ gasPrice: formatedGasPrice, rawGasPrice: gasPrice}))
    // Move to next function.
    yield* handleEthPriceLoad()
}

export default function* watchGetMarketData() {
    yield takeEvery(GET_MARKET_DATA, handleMarketDataLoading)
}

