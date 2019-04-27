import { takeEvery, put, call, fork, select } from 'redux-saga/effects';

import { SEND_TX } from '../actions/types';

// Crypto imports
import 'ethers/dist/shims.js'; 
import { ethers } from 'ethers';
import { config } from '../../config';

import { 
    setBalanceInReduxState, 
    setTransactionsInReduxState, 
} from '../actions/PlaidActions';

const getTxItems = state => state.ethTx;

let Provider = ethers.getDefaultProvider();
let wallet = ethers.Wallet.fromMnemonic(config.seed);
let connectedWallet = new ethers.Wallet(wallet.privateKey, Provider);

// 0xCc74308838BbAcEEC226611A0C2b3fD5f4a7D8a2

function* signTransaction(rawTx) {
    console.log('1')
    let signedTx = yield wallet.sign(rawTx)
    console.log('2')
    // PUT "Sending Tx" message action
    let minedTX = yield Provider.sendTransaction(signedTx)
    console.log('Mined Tx: ', minedTX)
}

function* handleTransactionLoad() {
    let stateItems = yield select(getTxItems)
    let nonce = yield connectedWallet.getTransactionCount()
    let gasPrice = yield Provider.getGasPrice()
    let value = yield ethers.utils.parseEther(stateItems.amount)
    let chainId = yield ethers.utils.getNetwork('homestead').chainId

    
    let rawTx = {
        nonce: nonce,
        gasLimit: 21000,
        gasPrice: ethers.utils.bigNumberify(gasPrice.toString()),   
        to: '0xCc74308838BbAcEEC226611A0C2b3fD5f4a7D8a2', // change to: stateItems.address
        value: value,
        data: "0x",
        chainId: chainId
    }
    yield* signTransaction(rawTx)

}

function* handleTxSend() {
    // PUT "Building & Signing Tx" message action
    yield call(handleTransactionLoad)
}

export default function* watchTxSend() {
    yield takeEvery(SEND_TX, handleTxSend)
}

