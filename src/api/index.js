import { AsyncStorage } from 'react-native'
import axios from 'axios'

import { calculateDH, encryptData, decryptData } from './helper'
// const crypto = require('crypto')

const CRYPTO_BASE_URL = 'https://api.cryptonator.com/api/ticker'

const BASE_URL = 'http://localhost:3000/api'
const AUTH_EXT = '/auth'
const ESC_EXT = '/esc'
const MARKET_DATA_EXT = '/data'
const PLAID_EXT = '/plaid'

// ASYNCSTORAGE TOKEN FUNCTIONS //

/**
 *  Keys used so far:
 *  @ 'token' - unique user token returned from the auth backend.
 *  @ 'plaid-tokens' - array of plaid access_tokens.
 *  @ 'wallet' - ethers encrypted wallet.
 *  @ 'secret' - secure connection secret
 */

// 'MIDDLEWARE'
const getBuilder = ({ url, navigation }) => {
	return axios.get( BASE_URL + url )
	// .then( masterMiddleWare )
	.catch(resp => errorMiddleWare(resp, navigation) )
}

const postBuilder = async ({ url, body, navigation }) => {
	const encData = await encryptData(body)

	return await axios.post( BASE_URL + url, encData )
	// .then( masterMiddleWare )
	.catch( resp => errorMiddleWare(resp, navigation) )
}

const masterMiddleWare = async (resp) => {
	// await sessionMiddleWare(resp, navigation)
	console.log("NEW resp:", resp)
	return decryptData(resp.data)
}

const errorMiddleWare = (resp, navigation) => {
	// if(resp.status === 401) {
	// 	navigation.navigate('SignUp')
	// }

	// return resp
	switch(resp.status) {
		case 401:
			navigation.navigate('SignUp')
			break
		default:
			// navigation.navigate('404')
			return null
	}
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
export const authCreateUser = (name, password, navigation) => {
	return postBuilder({ 
		url: AUTH_EXT + '/register', 
		body: { name, password },
		navigation,
	})
}

// CALL "/identify" ENDPOINT, RETURNS NAME & ID.
export const identifyUser = (token, navigation) => {
	return postBuilder({
		url: AUTH_EXT + '/identify',
		body: { token },
		navigation,
	})
}

// CALL "/login" ENDPOINT, RETURNS OBJECT { auth: bool, token: token }
export const verifyUser = (userID, password) => {
	return postBuilder({ 
		url: AUTH_EXT + '/login',
		body: { password, _id: userID },
	})
}

// PLAID API FUNCTIONS //

// CALL "/get_acess_token" ENDPOINT.
export const getAccessToken = async publicToken => {
	// console.log(' hit! ', URL + plaid/get_access_token')

	return await postBuilder({ 
		url: PLAID_EXT + '/get_access_token', 
		body: { public_token: publicToken	},
	})
}

export const getBalance = async () => {
	const tokens = JSON.parse(await getTokenFromMemory('plaid-tokens'))

	return await postBuilder({ 
		url: PLAID_EXT + '/accounts', 
		body: { accessTokenArray: tokens.tokenArray },
	})
}

export const getTransactions = async () => {
	const tokens = JSON.parse(await getTokenFromMemory('plaid-tokens'))

	return await postBuilder({ 
		url: PLAID_EXT + '/last_90_days_transactions', 
		body: { accessTokenArray: tokens.tokenArray },
	})
}

// MARKET DATA FUNCTIONS //

export const getHistoricPrices = async (timeframe, currency) => {
	return await postBuilder({ 
		url: MARKET_DATA_EXT + '/get_historical_data', // NOT SURE IF NEED TO MAKE IT AN _EXT CONSTANT
		body: { timeframe, currency },
	})
}

export const getEthPrice = async () => {
	return await axios.get( CRYPTO_BASE_URL + '/eth-usd' )
}

export const getBtcPrice = async () => {
    return await axios.get(CRYPTO_BASE_URL + '/btc-usd' )
}

// ESTABLISH SC
export const requestSecConn = async () => {
		console.log("REQUEST SECURE CONNECTION")
    return await axios.get( BASE_URL + ESC_EXT )
}

export const establishSecConn = async ({ key, prime, generator }) => {
		console.log("ESTABLISH SECURE CONNECTION")
    const { cKey, secret } = calculateDH(key, prime, generator)

    AsyncStorage.setItem('secret', secret.toString('hex')) // NEED TO MORE SECURE FORM OF STORAGE

    return await axios.post( BASE_URL + ESC_EXT, { cKey } )
}
