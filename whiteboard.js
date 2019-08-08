
  1. Clear watchman watches: `watchman watch-del-all`.
  2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
  3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`.
  4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`. (null))


  /**
    // Generate a mnemonic seed phrase using Bitcoin bip39 standard.
    let mnemonic = await bip39.generateMnemonic()

    // Use the same mnemonic to generate a Ethereum Wallet.
    let wallet = ethers.Wallet.fromMnemonic(mnemonic);

    // Create a new password.
    const password = 'Super-Secure-Password'

    // Encrypt wallet using password.
    let encrypted = await wallet.encrypt(password, this.encryptionProgress)
    console.log('Encrypted wallet object: ', encrypted)

    // Decrypt wallet using same password.
    let decrypted = await ethers.Wallet.fromEncryptedJson(encrypted, password, this.decryptionProgress)
    console.log('Decrypted wallet: ', decrypted)

    // Set state with the mnemonic seed and address we just generated. 
    this.setState({ mnemonic, address: decrypted.address})
    */


<Input 
    placeholder="0"
    inputContainerStyle={amountInputContainer}
    placeholderTextColor='#040026'
    value={ amount } 
    secureTextEntry={false}
    onFocus={ () => this.setState({ amountElevated: true })}
    onEndEditing={ () => this.setState({ amountElevated: false })}
    onChangeText={ value => setAmountInReduxState(value)}
    inputStyle={{ fontFamily: 'Aleo-Regular', fontSize: 46, color: colors.primaryBlue }}
/>

{ numeral(amountInDollars / currentPriceETH ).format('0.0,00') + ' Eth'} 