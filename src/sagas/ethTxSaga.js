import {takeEvery, put, call, select, delay} from 'redux-saga/effects'

import {SEND_TX} from '../actions/types'

import {setLoading, setConfirmed, resetEthTxIntitialState} from '../actions'

// Crypto imports
import 'ethers/dist/shims.js'
import {ethers} from 'ethers'
import {config} from '../../node_modules/config'

const getTxItems = state => state.ethTx
const getMDItems = state => state.marketData

let Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)
let wallet = ethers.Wallet.fromMnemonic(config.seed)
let connectedWallet = new ethers.Wallet(wallet.privateKey, Provider)

// 0xCc74308838BbAcEEC226611A0C2b3fD5f4a7D8a2

function* signTransaction(rawTx) {
	// Sign Transaction.
	let signedTx = yield wallet.sign(rawTx)
	// Send SignedTx.
	yield Provider.sendTransaction(signedTx)
	// Set Confirmed = true.
	yield put(setConfirmed())
	// Delay to display confirmation message
	yield delay(3000)
	// Reset original state in EthTxReducer.
	yield put(resetEthTxIntitialState())
}

function* handleTransactionLoad() {
	// Get EthTxReducer items.
	let stateItems = yield select(getTxItems)
	// Get MarketDataReducer items.
	let mdStateItems = yield select(getMDItems)
	// Get none.
	let nonce = yield connectedWallet.getTransactionCount()
	// Set Gas Price.
	let gasPrice = mdStateItems.rawGasPrice
	// Parse amount.
	let value = yield ethers.utils.parseEther(parseFloat(stateItems.amount))
	// Build tx object.
	let rawTx = {
		nonce: nonce,
		gasLimit: 21000,
		gasPrice: ethers.utils.bigNumberify((gasPrice * 1.5).toString()),
		to: stateItems.address,
		value: value,
		data: '0x',
		chainId: 1,
	}
	// Sign Transaction.
	yield* signTransaction(rawTx)
}

function* handleTxSend() {
	// Set Loading = true.
	yield put(setLoading())
	// Build transaction object.
	yield call(handleTransactionLoad)
}

export default function* watchTxSend() {
	yield takeEvery(SEND_TX, handleTxSend)
}
