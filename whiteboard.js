
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


<View style={styles.boxContainer}>
                    <StatsCard
                        icon={"credit-card"}
                        text={"May's Spenditures: "}
                        amount={'347,85'} 
                    />
                </View>

                <View style={styles.boxContainer}>
                    <StatsCard
                        icon={"arrow-right-circle"}
                        text={"May's Income: "}
                        amount={'3.323,85'} 
                    />
                </View>

                <View style={styles.boxContainer}>
                    <StatsCard
                        icon={"activity"}
                        text={"May's Interests Earned: "}
                        amount={'127,85'} 
                    />
                </View>

                <View style={styles.boxContainer}>
                    <StatsCard
                        icon={"trending-up"}
                        text={"Total Investment Value: "}
                        amount={'4.810,00'} 
                    />
                </View>


<CustomCard style={styles.smalleBoxContainer} elevated={true}>
<TouchableOpacity onPress={() => this.props.navigation.navigate('ethDashboard')} >
    <StatusDot positive={true} size={10}/>
    <Text style={[styles.textStyle, { fontSize: 22, marginLeft: 5 }]}>
        $1,365 <Text style={[styles.textStyle, { fontSize: 12 }]}> ETH </Text>
    </Text>
</TouchableOpacity > 
</CustomCard>

<CustomCard style={styles.smalleBoxContainer} elevated={true}>
<TouchableOpacity onPress={() => null} >
    <StatusDot positive={false} size={10}/>
    <Text style={[styles.textStyle, { fontSize: 22, marginLeft: 5 }]}>
        $3,445 <Text style={[styles.textStyle, { fontSize: 12 }]}> BTC</Text>
    </Text> 
</TouchableOpacity > 
</CustomCard>