import {AsyncStorage} from 'react-native'
import axios from 'axios'
import {calculateDH} from './helper'
import {postBuilder} from './middleware';

const URL = 'http://localhost:3000/api'


////////////////////////////////////
// ASYNCSTORAGE TOKEN FUNCTIONS 
////////////////////////////////////

/**
 *  Keys used so far:
 *  @ 'token' - unique user token returned from the auth backend.
 *  @ 'plaid-tokens' - array of plaid access_tokens.
 *  @ 'wallet' - ethers encrypted wallet.
 */


// CHECK IF TOKEN EXISTS, RETURNS BOOLEAN.
export const isLoggedIn = async () => {
	const token = await AsyncStorage.getItem('token')
	return !!token
}

// SET TOKEN IN MEMORY.
export const setTokenInMemory = async (key, token) => {
	return await AsyncStorage.setItem(key, token)
}

// GET TOKEN.
export const getTokenFromMemory = async key => {
	return await AsyncStorage.getItem(key)
}

// REMOVE TOKEN.
export const removeTokenFromMemory = async key => {
	return await AsyncStorage.removeItem(key)
}


////////////////////////////////////
// DIFFIE HELLMAN FUNCTIONS 
////////////////////////////////////

// REQUEST SECURE CONNECTION
export const requestSC = async () => {
	return await axios.get(URL + '/esc')
}

// ESTABLISH SECURE CONNECTION (SESSION SECRET).
export const establishSC = async ({ id, prime, generator, pubKey }) => {
	await AsyncStorage.setItem('id', id)
	const key = calculateDH(prime, generator, pubKey)
	return await axios.post(URL + '/esc', { id, key })
}


////////////////////////////////////
// AUTH FUNCTIONS 
////////////////////////////////////

// CALL "/register" ENDPOINT.
export const authCreateUser = (name, password) => {
	return postBuilder(URL + '/auth/register', {name, password})
}

// CALL "/identify" ENDPOINT, RETURNS NAME & ID.
export const identifyUser = token => {
	return postBuilder(URL + '/auth/identify', {token})
	}

// CALL "/login" ENDPOINT, RETURNS OBJECT { auth: bool, token: token }
export const verifyUser = (userID, password) => {
	return postBuilder(URL + '/auth/login', {_id: userID, password})
}


////////////////////////////////////
// PLAID FUNCTIONS 
////////////////////////////////////

// EXCHANGE PUBLIC FOR ACCESS TOCKEN
export const getAccessToken = async publicToken => {
	return await postBuilder(URL + '/plaid/get_access_token', {
		public_token: publicToken,
	})
}

// FETCH BALANCES FOR EVERY ACCOUNT
export const getBalance = async () => {
	const tokens = JSON.parse(await getTokenFromMemory('plaid-tokens'))
	return await postBuilder(URL + '/plaid/accounts', {
		accessTokenArray: tokens.tokenArray,
	})
}

// FETCH TRANSACTION HISTORY.
export const getTransactions = async () => {
	const tokens = JSON.parse(await getTokenFromMemory('plaid-tokens'))
	return await postBuilder(URL + '/plaid/last_90_days_transactions', {
		accessTokenArray: tokens.tokenArray,
	})
}


////////////////////////////////////
// MARKET DATA FUNCTIONS 
////////////////////////////////////

// FETCH CRYPTO HISTORIC PRICES.
export const getHistoricPrices = async (timeframe, currency) => {
	return await postBuilder(URL + '/data/get_historical_data', {
		timeframe,
		currency,
	})
}

// FETCH CURRENT ETH PRICE. 
export const getEthPrice = async () => {
	return await axios.get('https://api.cryptonator.com/api/ticker/eth-usd')
}

// FETCH CURRENT BTC PRICE.
export const getBtcPrice = async () => {
	return await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
}
