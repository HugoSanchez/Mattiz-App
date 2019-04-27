import { takeEvery, put, call, fork, select } from 'redux-saga/effects';

import { SEND_TX } from '../actions/types';

// Crypto imports
import 'ethers/dist/shims.js'; 
import { ethers } from 'ethers';
import { config } from '../../node_modules/config';

import { 
    setLoading,  
} from '../actions';

const getTxItems = state => state.ethTx;

let Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)
let wallet = ethers.Wallet.fromMnemonic(config.seed);
let connectedWallet = new ethers.Wallet(wallet.privateKey, Provider);

// 0xD38d889dD78AD08fE8A56Dcc3C8412f1E93C1D3F

function* signTransaction(rawTx) {
    // Sign Transaction.
    let signedTx = yield wallet.sign(rawTx)

    // Send SignedTx.
    //let sentTX = yield Provider.sendTransaction(signedTx)

    // Put final action.
    // to do. 
}

function* handleTransactionLoad() {
    let stateItems = yield select(getTxItems)
    let nonce = yield connectedWallet.getTransactionCount()
    let gasPrice = yield Provider.getGasPrice()
    let value = yield ethers.utils.parseEther(stateItems.amount)

    let rawTx = {
        nonce: nonce,
        gasLimit: 21000,
        gasPrice: ethers.utils.bigNumberify((gasPrice * 1.5).toString()),
        to: stateItems.address,
        value: value,
        data: "0x",
        chainId: 1
    }
    
    yield* signTransaction(rawTx)
}

function* handleTxSend() {
    yield put(setLoading())
    // PUT "Building & Signing Tx" message action
    yield call(handleTransactionLoad)
}

export default function* watchTxSend() {
    yield takeEvery(SEND_TX, handleTxSend)
}

