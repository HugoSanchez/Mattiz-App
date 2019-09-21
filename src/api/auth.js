import { AsyncStorage } from 'react-native';
import axios from 'axios';
// const crypto = require('crypto')
import crypto from 'crypto'

const URL = 'http://localhost:3000/api'

    // ASYNCSTORAGE TOKEN FUNCTIONS // 

/**
 *  Keys used so far:
 *  @ 'token' - unique user token returned from the auth backend.
 *  @ 'plaid-tokens' - array of plaid access_tokens.  
 *  @ 'wallet' - ethers encrypted wallet.
 */

// CHECK IF TOKEN EXISTS, RETURNS BOOLEAN.
export const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token
}

// SET TOKEN IN MEMORY.
export const setTokenInMemory = async (key, token) => {
    return await AsyncStorage.setItem(key, token)
}

// GET TOKEN. 
export const getTokenFromMemory = async (key) => {
    return await AsyncStorage.getItem(key)
}

// REMOVE TOKEN.
export const removeTokenFromMemory = async (key) => {
    return await AsyncStorage.removeItem(key)
}

    // AUTH API FUNCTIONS //

// CALL "/register" ENDPOINT.
export const authCreateUser = (name, password) => {
    return axios.post(URL + '/auth/register', encryptData({name, password}, "password"))
}

// CALL "/identify" ENDPOINT, RETURNS NAME & ID.
export const identifyUser = (token) => {
    return axios.post(URL + '/auth/identify', {token})
}

// CALL "/login" ENDPOINT, RETURNS OBJECT { auth: bool, token: token }
export const verifyUser = (userID, password) => {
    return axios.post(URL + '/auth/login', { _id: userID, password })
}

    // PLAID API FUNCTIONS //

// CALL "/get_acess_token" ENDPOINT.
export const getAccessToken = async (publicToken) => {
    console.log(' hit! ', URL + "/plaid/get_access_token")
    return await axios.post(URL + '/plaid/get_access_token', { public_token: publicToken })
}

export const getBalance = async () => {
    const tokens = JSON.parse(await getTokenFromMemory('plaid-tokens'))
    return await axios.post(URL + '/plaid/accounts', { accessTokenArray: tokens.tokenArray })
}

export const getTransactions = async () => {
    const tokens = JSON.parse(await getTokenFromMemory('plaid-tokens'))
    return await axios.post(URL + '/plaid/last_90_days_transactions', { accessTokenArray: tokens.tokenArray })
} 

    // MARKET DATA FUNCTIONS // 

export const getHistoricPrices = async (timeframe, currency) => {
    return await axios.post(URL + '/data/get_historical_data', { timeframe, currency })
}

export const getEthPrice = async () => {
    return await axios.get('https://api.cryptonator.com/api/ticker/eth-usd')
}

export const getBtcPrice = async () => {
    return await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
}

// ENCRYPTION HELPER METHODS

const generateKey = (password) => {
  return crypto.createHash('sha256')
          .update(password)
          .digest()
}

const generateIv = (ivString) => {
  const iv16Bytes = Buffer.allocUnsafe(16)
  const iv32Bytes = crypto.createHash('sha256')
                    .update(ivString)
                    .digest()

  iv32Bytes.copy(iv16Bytes)

  return iv16Bytes
}

const generateCipher = (password, ivString) => {
  return crypto.createCipheriv(
    'aes256', 
    generateKey(password),
    generateIv(ivString)
  )
}

const generateDecipher = (password, ivString) => {
  return crypto.createDecipheriv(
    'aes256', 
    generateKey(password),
    generateIv(ivString)
  )
}

const encryptData = (data, password) => {
  const plainText = JSON.stringify(data)
  const cipher = generateCipher(password, "IVString")

  let encrypted = cipher.update(plainText, 'binary', 'hex')
  encrypted += cipher.final('hex')

  return { data: encrypted }
}

const decryptData = (cipherText, password) => {
  const decipher = generateDecipher(password, "IVString")

  let decrypted = decipher.update(cipherText, 'hex', 'binary')
  decrypted += decipher.final('binary')

  return JSON.parse(decrypted)
}