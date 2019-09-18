import { 
    takeEvery, 
    put, 
    select,
} from 'redux-saga/effects';

import { 
    SET_ETH_MAX 
} from '../actions/types';

import { 
    setEthAmount,
    setEthAmountInDollars,
    setEthRemainingBalance
} from '../actions';

import { ethers } from 'ethers';

/**
 * 
 * This is not working for the moment
 * due to parsing problems for big numbers.
 * Work in progress.
 * 
 */

const getTxItems  = state => state.ethTx;
const getMDItems  = state => state.marketData;
const getEthItems = state => state.ethCommon

function* handleSetMax({ payload }) {
    yield console.log('Hello')
    // Get EthReducer state items.
    let ethStateItems = yield select(getEthItems)
    // Get current ETH price from state.
    let currentBalance = ethStateItems.balance
    yield console.log('Balance: ', currentBalance)
    // Get MarketDataReducer state items.
    let mdStateItems = yield select(getMDItems)
    // Get current ETH price from state.
    let currentPriceETH = mdStateItems.currentPriceETH
    // Get current gas price
    let gasPrice = mdStateItems.rawGasPrice
    yield console.log('Gas Price: ', gasPrice)
    // Get ethTx items.
    let stateItems = yield select(getTxItems)
    // The exact cost (in gas) to send to an Externally Owned Account (EOA)
    let gasLimit = 21000;
    // Calculate total fees.
    let transactionFee = gasPrice.mul(gasLimit)
    console.log('Transaction Fee: ', transactionFee.toString())
    // The balance less exactly the txfee in wei
    yield console.log('Value: ', currentBalance - transactionFee.toString())
    
}

export default function* handleSetAmount() {
    // Take the initiate action and start forking based on payload.  0.000023539991936
    yield takeEvery(SET_ETH_MAX, handleSetMax)
}