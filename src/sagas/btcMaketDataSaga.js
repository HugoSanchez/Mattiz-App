import { 
    takeLatest,
    select,
    put
} from 'redux-saga/effects';

import { 
    GET_BTC_MARKET_DATA 
} from '../actions/types';

import { 
    setCurrentBtcPriceInReduxState,
    setBtcPriceHistoryInReduxState,
    setBtcPercentageInReduxState
} from '../actions';

import {
    getBtcPrice,
    getHistoricPrices
} from '../api/auth';

const timeframeState = state => state.timeframe;

function* handleHistoricLoad() {
    let time = yield select(timeframeState)
    // Call Nomics API.
    let historicBtcPrice = yield getHistoricPrices(time.timeframe, 'BTC')
    console.log("HistoricBtcPrices: ", historicBtcPrice)
    // Get the actual price rates from the response.
    let rates = historicBtcPrice.data.rates
    // Calculate percentage variation.
    let percentage = (rates[rates.length -1] - rates[0]) / rates[0] * 100
    // Set price array in state.
    yield put(setBtcPriceHistoryInReduxState(rates))
    // Set percentage variation in state.
    yield put(setBtcPercentageInReduxState(percentage.toFixed(2)))
    // Move to next function.
    yield* handleBtcPriceLoad()
}

function* handleBtcPriceLoad() {
    // Call cryptonator API. 
    let res = yield getBtcPrice()
    // Parse result. 
    let btcPrice = parseFloat(res.data.ticker.price).toFixed(2)
    // Set result in redux state.
    yield put(setCurrentBtcPriceInReduxState(btcPrice))
    // Done.
}


export default function* watchGetMarketData() {
    // Take 'loadMarketDataETH' action.
    yield takeLatest(GET_BTC_MARKET_DATA, handleHistoricLoad);
}

