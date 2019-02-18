import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

// Crypto imports.
import crypto from 'crypto';
import bip39 from 'react-native-bip39';
import 'ethers/dist/shims.js'; // Required 'Shim' for ethers.js to work in React Native.
import { ethers } from 'ethers';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state =  {
    mnemonic: '',
    address: ''
  }

  async componentWillMount() {
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
  }

  // Encryption progress callback
  encryptionProgress(progress) {
      console.log("Encrypting: " + parseInt(progress * 100) + "% complete");
  }

  // Decryption progress callback
  decryptionProgress(progress) {
    console.log("Decrypting: " + parseInt(progress * 100) + "% complete");
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>Mnemonic seed: {this.state.mnemonic}</Text>
        <Text style={styles.instructions}>Ethereum Address: {this.state.address}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 35
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
