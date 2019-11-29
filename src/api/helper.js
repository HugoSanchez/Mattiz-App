import crypto from 'crypto'
import configureStore from '../store'
import { setSessionSecretInReduxState } from '../actions'
import { AsyncStorage } from '@react-native-community/async-storage'

// const store = configureStore()
let currentSecret = null

const generateKey = (password) => {
  /* 
    Generate a key from a hex string of any length by hashing it to create a 32bit key
  */
  return crypto.createHash('sha256')
          .update(password)
          .digest()
}

const generateIv = (ivString) => {
   /* 
    Generate an Initital Vector string from a plaintext string of any length by hashing it 
    to create a 32bit key, from which we copy the frist 16bits (as the IV needs to be 16bit)
  */
  const iv16Bytes = Buffer.allocUnsafe(16)
  const iv32Bytes = crypto.createHash('sha256')
                    .update(ivString)
                    .digest()

  iv32Bytes.copy(iv16Bytes)

  return iv16Bytes
}

const generateCipher = (password, ivString) => {
  /*
    Generate cipher from a 32bit `password` and 16bit `ivString`
  */
  return crypto.createCipheriv(
    'aes256', 
    generateKey(password),
    generateIv(ivString)
  )
}

const generateDecipher = (password, ivString) => {
  /*
    Generate decipher from a 32bit `password` and 16bit `ivString`
  */
  return crypto.createDecipheriv(
    'aes256', 
    generateKey(password),
    generateIv(ivString)
  )
}

const encryptData = async (data) => {
  /*
    Takes in a `data` object and a `password` hex string

    Returns an object with { data: encryptedData }
  */

  // console.log("encryptData()...")
  // const state = store.getState()
  // const password = state.auth.secret

  const plainText = JSON.stringify(data)
  const cipher = generateCipher(currentSecret, "IdeallyCryptographicallyRandom")

  let encrypted = cipher.update(plainText, 'binary', 'hex')
  encrypted += cipher.final('hex')

  return { data: encrypted }
}

const decryptData = async (cipherText) => {
  /*
    Takes in a `cipherText` and a `password` hex string

    Returns the decrypted data as the original encrypted object
  */

  // console.log("decryptData()...")
  // const state = store.getState()
  // const password = state.auth.secret

  const decipher = generateDecipher(currentSecret, "IdeallyCryptographicallyRandom")

  let decrypted = decipher.update(cipherText, 'hex', 'binary')
  decrypted += decipher.final('binary')

  return JSON.parse(decrypted)
}

const calculateDH = (pubKeyHex, primeHex, generatorHex) => {
  /*
    Takes in a `pubKeyHex`, `primeKeyHex`, and `generatorHex` to calculate corresponding DiffieHelman

    Returns own pubKey as a hex string
  */

  // console.log("calculateDH()...")
  const pubKeyBuffer = Buffer.from(pubKeyHex, 'hex')
  const primeBuffer = Buffer.from(primeHex, 'hex')
  const generatorBuffer = Buffer.from(generatorHex, 'hex')

  const dH = crypto.createDiffieHellman(primeBuffer, generatorBuffer)
  const key = dH.generateKeys()
  // const secret = dH.computeSecret(pubKeyBuffer).toString('hex')
  currentSecret = dH.computeSecret(pubKeyBuffer).toString('hex')

  // store.dispatch(setSessionSecretInReduxState(secret))

  return key.toString('hex')
}

module.exports = {
  encryptData,
  decryptData,
  calculateDH,
}