import crypto from 'crypto'
import { AsyncStorage } from 'react-native'

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
  const password = await AsyncStorage.getItem('secret')
  const plainText = JSON.stringify(data)
  const cipher = generateCipher(password, "IVString")

  let encrypted = cipher.update(plainText, 'binary', 'hex')
  encrypted += cipher.final('hex')

  return { data: encrypted, sessionId: await AsyncStorage.getItem('sessionId') }
}

const decryptData = async (cipherText) => {
  const password = await AsyncStorage.getItem('secret')
  const decipher = generateDecipher(password, "IVString")

  let decrypted = decipher.update(cipherText, 'hex', 'binary')
  decrypted += decipher.final('binary')

  return JSON.parse(decrypted)
}
////////////////////////////////////////////////////////////////

const establishDH = (sKey, prime, generator) => {
  const keyBuffer = Buffer.from(sKey.data)
  const primeBuffer = Buffer.from(prime.data)
  const generatorBuffer = Buffer.from(generator.data)

  console.time("\n2nd DiffieHellman\n")
  const dH = crypto.createDiffieHellman(primeBuffer, generatorBuffer)
  console.timeEnd("\n2nd DiffieHellman\n")

  console.time("\nclientKey\n")
  const cKey = dH.generateKeys()
  console.timeEnd("\nclientKey\n")

  console.time("\ncomputeSecret\n")
  const secret = dH.computeSecret(keyBuffer)
  console.timeEnd("\ncomputeSecret\n")

  console.log("ServerKey: ", keyBuffer.toString('hex'))
  console.log("prime: ", primeBuffer.toString('hex'))
  console.log("generator: ", generatorBuffer.toString('hex'))
  console.log("ClientKey: ", cKey.toString('hex'))

  return {
    cKey,
    secret,
  }
}


////////////////////////////////////////////////////////////////

module.exports = {
  encryptData,
  decryptData,
  establishDH,
}