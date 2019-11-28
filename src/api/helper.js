import crypto from 'crypto'
import configureStore from '../store'
import { setSessionSecretInReduxState } from '../actions'
import { AsyncStorage } from '@react-native-community/async-storage'

const store = configureStore()

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

const encryptData = async (data) => {
  const state = store.getState()
  const password = state.auth.secret

  const plainText = JSON.stringify(data)
  const cipher = generateCipher(password, "IdeallyCryptographicallyRandom")

  let encrypted = cipher.update(plainText, 'binary', 'hex')
  encrypted += cipher.final('hex')

  return { data: encrypted }
}

const decryptData = async (cipherText) => {
  const state = store.getState()
  const password = state.auth.secret

  const decipher = generateDecipher(password, "IdeallyCryptographicallyRandom")

  let decrypted = decipher.update(cipherText, 'hex', 'binary')
  decrypted += decipher.final('binary')

  return JSON.parse(decrypted)
}
////////////////////////////////////////////////////////////////

const calculateDH = (sKey, prime, generator) => {
  
  const keyBuffer = Buffer.from(sKey.data)
  const primeBuffer = Buffer.from(prime.data)
  const generatorBuffer = Buffer.from(generator.data)

  const dH = crypto.createDiffieHellman(primeBuffer, generatorBuffer)
  const cKey = dH.generateKeys()
  const secret = dH.computeSecret(keyBuffer)

  store.dispatch(setSessionSecretInReduxState(secret.toString('hex')))
  const state = store.getState()
  console.log('State: ', state)


  return {
    cKey,
  }
}


////////////////////////////////////////////////////////////////

module.exports = {
  encryptData,
  decryptData,
  calculateDH,
}