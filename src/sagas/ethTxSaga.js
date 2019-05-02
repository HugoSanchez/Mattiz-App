import { 
    takeEvery, 
    put, 
    call, 
    select 
} from 'redux-saga/effects';

import { 
    SEND_TX 
} from '../actions/types';

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
const getMDItems = state => state.marketData;

let Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)
let wallet = ethers.Wallet.fromMnemonic(config.seed);
let connectedWallet = new ethers.Wallet(wallet.privateKey, Provider);

// 0xD38d889dD78AD08fE8A56Dcc3C8412f1E93C1D3F

function* signTransaction(rawTx) {
    console.log('10')
    // Sign Transaction.
    let signedTx = yield wallet.sign(rawTx)

    // Send SignedTx.
    //let sentTX = yield Provider.sendTransaction(signedTx)
    console.log('11')
    yield put(setConfirmed())
    console.log('12')

    yield delay(3000)
    yield put(resetIntitialState())
    console.log('14')
    // Put final action.
    // to do. 
}

function* handleTransactionLoad() {
    console.log('3')
    let stateItems = yield select(getTxItems)
    let mdStateItems = yield select(getMDItems)
    console.log('4')
    let nonce = yield connectedWallet.getTransactionCount()
    console.log('5')
    let gasPrice = stateItems.gasPrice
    console.log('6')
    let value = yield ethers.utils.parseEther(stateItems.amount)
    console.log('7')

    let rawTx = {
        nonce: nonce,
        gasLimit: 21000,
        gasPrice: ethers.utils.bigNumberify((gasPrice * 1.5).toString()),
        to: stateItems.address,
        value: value,
        data: "0x",
        chainId: 1
    }
    console.log('8')
    yield* signTransaction(rawTx)
}

function* handleTxSend() {
    console.log('1')
    yield put(setLoading())
    console.log('2')
    yield call(handleTransactionLoad)
}

export default function* watchTxSend() {
    yield takeEvery(SEND_TX, handleTxSend)
}

