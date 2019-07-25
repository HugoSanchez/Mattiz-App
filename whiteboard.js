
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


<CustomCard style={styles.balanceBoxContainer} elevated={false}>
                        <View style={{ flex: 6, alignSelf: 'stretch', alignItems: 'center', boderWidth: 1, borderColor: '#000' }}>
                            <SimpleLineChart data={this.state.data}>
                            <View style={{ alignSelf: 'stretch', alignItems: 'center', paddingTop: '5%' }}>
                                <Text style={[ GS.extraSmallBoldNumber, { color: colors.numbersGreen } ]}>
                                    { this.state.percentage }
                                </Text> 
                                {
                                    this.state.boxItem == 'total' ?
                                    <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                                        <Text style={ GS.bigLightNumber }>
                                            {  numeral(this.props.balance).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> Aggregated Balance </Text>
                                    </View>
                                    :
                                    null
                                }
                                {
                                    this.state.boxItem == 'savings' ?
                                    <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                                        <Text style={ GS.bigLightNumber }>
                                            {  numeral(this.state.balance).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> Current Accounts Balance </Text>
                                    </View>
                                    :
                                    null
                                }
                                {
                                    this.state.boxItem == 'ether' 
                                    ? <EthDashboard />
                                    : null
                                }
                                {
                                    this.state.boxItem == 'bitcoin' ?
                                    <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                                        <Text style={ GS.bigLightNumber }>
                                            {  numeral(this.state.btcBalance).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> BTC Balance </Text>
                                        <Text style={[ GS.smallLightNumber, { marginTop: '2%'} ]}>
                                            {  numeral(this.state.btcPrice).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> BTC Price </Text>
                                    </View>
                                    :
                                    null
                                }
                            </View>
                            </SimpleLineChart>
                        </View>

                       <TimeframeSelector
                            onWeekPress={() => {
                                this.props.setTimeframeinReduxState('week')
                                this.reloadData('week')
                            }}
                            onMonthPress={() => {
                                this.props.setTimeframeinReduxState('month')
                                this.reloadData('month')
                            }}
                            onQuarterPress={() => {
                                this.props.setTimeframeinReduxState('quarter')
                                this.reloadData('quarter')
                            }}
                            onYearPress={() => {
                                this.props.setTimeframeinReduxState('year')
                                this.reloadData('year')
                            }}
                       />
                    </CustomCard>