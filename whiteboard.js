
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


<View style={ styles.boxContainer }>
                        <View style={{ flex: 4, flexDirection: 'row', paddingLeft: '2%', paddingRight: '2%' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.setState({ boxItem: 'total' })
                                        this.reloadData(this.state.timeframe)
                                    }} 
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#F7DDDD', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/totalBag.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.setState({ boxItem: 'savings', balance: '107011.19', percentage: '+ 1.25%'})
                                        this.reloadData(this.state.timeframe)
                                    }} 
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#DDEDF7', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/savingsIcon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.loadEthData()
                                        this.setState({ boxItem: 'ether'})
                                    }} 
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#E7F7DD', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/smallEtherIcon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.setState({ boxItem: 'bitcoin'})
                                    }}  
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#F7F4DD', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/smallBitcoinIcon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.setState({ boxItem: 'others'})
                                    }} 
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#DDF7F6', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/plusSign.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: '2%', paddingRight: '2%', marginBottom: '2%'}}>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'total'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'total'?
                                    { fontFamily: 'Raleway-Bold'}
                                    :
                                    null
                                    ]}> Total </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'savings'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'savings'?
                                    { fontFamily: 'Raleway-Bold'}
                                    :
                                    null
                                    ]}> Savings </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'ether'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'ether'?
                                    { fontFamily: 'Raleway-Bold'}
                                    :
                                    null
                                    ]}> Ether </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'bitcoin'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'bitcoin'?
                                    { fontFamily: 'Raleway-Bold'}
                                    :
                                    null
                                    ]}> Bitcoin </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'others'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'others'?
                                    { fontFamily: 'Raleway-Bold'}
                                    :
                                    null
                                    ]}> Others </Text>
                            </TouchableOpacity>
                        </View>
                    </View>