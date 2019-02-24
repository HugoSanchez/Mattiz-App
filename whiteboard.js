// Crypto imports.
import crypto from 'crypto';
import bip39 from 'react-native-bip39';
import 'ethers/dist/shims.js'; // Required 'Shim' for ethers.js to work in React Native.
import { ethers } from 'ethers';

// Generate a new mnemonic seed phrase using Bitcoin bip39 standard.
let mnemonic = await bip39.generateMnemonic()

// Use the same mnemonic to generate a new Ethereum wallet. 
let wallet = ethers.Wallet.fromMnemonic(mnemonic);

// Create a new password.
let password = "amazing-password";

// Encrypt wallet using password.
let encrypted = await wallet.encrypt(password, this.encryptionProgress);
console.log('Encrypted Wallet', encrypted)

// Decrypt wallet using same password.
const decrypted = await ethers.Wallet.fromEncryptedJson (encrypted, password, this.decryptionProgress);
console.log('Decrypted Wallet', decrypted)

// Set the state with the mnemonic seed and address we just generated.
this.setState({ mnemonic, address: decrypted.address });

// Encryption progress callback
encryptionProgress(progress) {
    console.log("Encrypting: " + parseInt(progress * 100) + "% complete");
}

// Decryption progress callback
decryptionProgress(progress) {
  console.log("Decrypting: " + parseInt(progress * 100) + "% complete");
}

