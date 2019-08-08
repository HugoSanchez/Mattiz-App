import { 
    takeEvery, 
    put, 
    select,
} from 'redux-saga/effects';

import { 
    INITIATE_SET_AMOUNT 
} from '../actions/types';

import { 
    setEthAmount,
    setEthAmountInDollars,
} from '../actions';

const getTxItems = state => state.ethTx;
const getMDItems = state => state.marketData;

function* handleScenarioFork({ payload }) {
    // Get MarketDataReducer state items.
    let mdStateItems = yield select(getMDItems)
    // Get current ETH price from state.
    let currentPriceETH = mdStateItems.currentPriceETH
    // Get ethTx items.
    let stateItems = yield select(getTxItems)
    // Get current amount in dollars.
    let amountInDollars = stateItems.amountInDollars.toString()

    if (payload === 'delete') { yield* handleDelete(amountInDollars, currentPriceETH) } 
    else { yield* handleNumbers(amountInDollars, currentPriceETH, payload) }
    
}

function* handleDelete(amountInDollars, currentPriceETH) {
    // If amount length === 1, then deleting sets both amounts, back to O.
    if (amountInDollars.length === 1) { 
        // First, set the dollar amount,
        yield put(setEthAmountInDollars('0')) 
        // and the Eth amount.
        yield put(setEthAmount(0))
    }
    // Otherwise,
    else {
        // just slash the last string,
        let newAmountInDollars = amountInDollars.slice(0, -1)
        // and set the resulting amount into redux.
        yield put(setEthAmountInDollars(newAmountInDollars))
        // Also, calculate and parse the new corresponding ETH amount,
        let newEthAmount = parseFloat((newAmountInDollars) / currentPriceETH).toFixed(1)
        // And set the resulting amount into redux.
        yield put(setEthAmount(newEthAmount))
    }      
}

function* handleNumbers(amountInDollars, currentPriceETH, payload) {
    // In case an amount has already been set, 
    // and its lenght is greater than one:
    if (amountInDollars > 0 || amountInDollars.length > 1) {
        // If amount already contains one dot 
        // and payload is another dot, return null
        if (amountInDollars.includes('.') && payload == '.') { yield null }
        // In not,
        else {
            // concat number or dot,
            let newAmountInDollars = amountInDollars.concat(payload)
            // set new amount in dollars.
            yield put(setEthAmountInDollars(newAmountInDollars)) 
            // Also, calculate and parse the new corresponding ETH amount,
            let newEthAmount = parseFloat((newAmountInDollars) / currentPriceETH).toFixed(4)
            // And set the resulting amount into redux.
            yield put(setEthAmount(newEthAmount))
        }
    // Else, if the payload is a dot,
    } else if ( payload == '.') {
        // do not add it if a dot already exists.
        if (amountInDollars.includes('.')) yield null
        // Set amount to '0.' otherwise.
        yield put(setEthAmountInDollars('0.'))
        // Also, calculate and parse the new corresponding ETH amount,
        let newEthAmount = parseFloat((0) / currentPriceETH).toFixed(0)
        // And set the resulting amount into redux.
        yield put(setEthAmount(newEthAmount))
    // Otherwise, amount is == 0, 
    } else {
        // so you just set the amount to be the payload.
        yield put(setEthAmountInDollars(payload)) 
        let decimals = payload == 0 ? 0 : 4;
        // Also, calculate and parse the new corresponding ETH amount,
        let newEthAmount = parseFloat((payload) / currentPriceETH).toFixed(decimals)
        // And set the resulting amount into redux.
        yield put(setEthAmount(newEthAmount))

    }   
}

export default function* handleSetAmount() {
    // Take the initiate action and start forking based on payload.
    yield takeEvery(INITIATE_SET_AMOUNT, handleScenarioFork)
}