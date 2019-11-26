import {AsyncStorage} from 'react-native'
import axios from 'axios'

const CRYPTO_BASE_URL = 'https://api.cryptonator.com/api/ticker'

const BASE_URL = 'http://localhost:3000'
const API_EXT = '/api'
const AUTH_EXT = API_EXT + '/auth'
const ESC_EXT = '/esc'
const MARKET_DATA_EXT = API_EXT + '/data'
const PLAID_EXT = API_EXT + '/plaid'

// ASYNCSTORAGE TOKEN FUNCTIONS //

/**
 *  Keys used so far:
 *  @ 'token' - unique user token returned from the auth backend.
 *  @ 'plaid-tokens' - array of plaid access_tokens.
 *  @ 'wallet' - ethers encrypted wallet.
 */

// 'MIDDLEWARE'
const getBuilder = ({ url, navigation }) => {
	return axios.get(BASE_URL + url)
	// .catch( resp => masterMiddleWare(resp, navigation) )
}

const postBuilder = ({ url, body, navigation }) => {
	return axios.post(BASE_URL + url, body)
	// .catch( resp => masterMiddleWare(resp, navigation) )
}

const masterMiddleWare = async (resp, navigation) => {
	await sessionMiddleWare(resp, navigation)
}

const sessionMiddleWare = async (resp, navigation) => {
	if(resp.status === 401) {
		navigation.navigate('Login')
	}

	return resp
}

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

// AUTH API FUNCTIONS //

// CALL "/register" ENDPOINT.
export const authCreateUser = (name, password) => {
	return postBuilder({ 
		url: URL + '/auth/register', 
		body: { name, password },
	})
}

// CALL "/identify" ENDPOINT, RETURNS NAME & ID.
export const identifyUser = (token, navigation) => {
	return postBuilder({
		url: AUTH_EXT + '/identify',
		body: { token },
	})
}

// CALL "/login" ENDPOINT, RETURNS OBJECT { auth: bool, token: token }
export const verifyUser = (userID, password) => {
	return postBuilder({ 
		url: URL + '/auth/login',
		body: { password, _id: userID },
	})
}

// PLAID API FUNCTIONS //

// CALL "/get_acess_token" ENDPOINT.
export const getAccessToken = async publicToken => {
	// console.log(' hit! ', URL + '/plaid/get_access_token')

	return await postBuilder({ 
		url: URL + '/plaid/get_access_token', 
		body: { public_token: publicToken	},
	})
}

export const getBalance = async () => {
	const tokens = JSON.parse(await getTokenFromMemory('plaid-tokens'))

	return await postBuilder({ 
		url: URL + '/plaid/accounts', 
		body: { accessTokenArray: tokens.tokenArray },
	})
}

export const getTransactions = async () => {
	const tokens = JSON.parse(await getTokenFromMemory('plaid-tokens'))

	return await postBuilder({ 
		url: URL + '/plaid/last_90_days_transactions', 
		body: { accessTokenArray: tokens.tokenArray },
	})
}

// MARKET DATA FUNCTIONS //

export const getHistoricPrices = async (timeframe, currency) => {
	return await postBuilder({ 
		url: URL + '/data/get_historical_data', 
		body: { timeframe, currency },
	})
}

export const getEthPrice = async () => {
	return await getBuilder('https://api.cryptonator.com/api/ticker/eth-usd')
}

export const getBtcPrice = async () => {
	return await getBuilder('https://api.cryptonator.com/api/ticker/btc-usd')
}
