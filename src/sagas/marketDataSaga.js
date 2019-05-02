import { takeEvery, put, call, select } from 'redux-saga/effects';

import { SEND_TX } from '../actions/types';

// Crypto imports
import 'ethers/dist/shims.js'; 
import { ethers } from 'ethers';
import { config } from '../../node_modules/config';

import { 
    setLoading,
    setConfirmed,
    resetIntitialState  
} from '../actions';

const getTxItems = state => state.ethTx;

let Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)
let wallet = ethers.Wallet.fromMnemonic(config.seed);
let connectedWallet = new ethers.Wallet(wallet.privateKey, Provider);

// 0xD38d889dD78AD08fE8A56Dcc3C8412f1E93C1D3F

function* signTransaction(rawTx) {
   
}

function* handleTransactionLoad() {
    
}

function* handleTxSend() {
  
}

export default function* watchGetMarketData() {
    yield takeEvery(GET_MARKET_DATA, handleTxSend)
}

