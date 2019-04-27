import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';

import { setTokenInMemory } from '../../api/auth';
import { loadPlaidInfo } from '../../actions';

// Crypto imports
import crypto from 'crypto'
import bip39 from 'react-native-bip39';
import 'ethers/dist/shims.js'; // Required 'Shim' for ethers.js to work in React Native.
import { ethers } from 'ethers';

// Custom components
import MattizButton from '../../components/common/MattizButton';
import LoadingScreen from '../../components/LoadingScreen';
import MnemonicDisplay from '../../components/MnemonicDisplay';


class GenerateWallet extends Component {

    state = {
        loading: true,
        mnemonic: [""],
        encryptedKeys: null
    }

    async componentWillMount() {
        // Load plaid info.
        this.props.loadPlaidInfo();

        // Create source of entropy
        let randomBytes = crypto.randomBytes(16)

        // Generate a mnemonic seed phrase using Bitcoin bip39 standard.
        let mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))

        // Use the same mnemonic to generate a Ethereum Wallet.
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);

        // Encrypt wallet using password.
        let encrypted = await wallet.encrypt(this.props.user.password, this.encryptionProgress)
        console.log('password: ', this.props.user.password)
        // Set wallet in memory.
        await setTokenInMemory('wallet', encrypted)

        // Stop loading, set mnemonic and encrypted wallet.
        this.setState({ loading: false, encryptedKeys: encrypted, mnemonic: mnemonic.split(' ')})
    }

    componentWillUnmount() {
        // When component gets unmounted, delete mnemonic from state. 
        this.setState({ loading: true, mnemonic: [""], encryptedKeys: null })
    }

    render() {
        const { 
            container,
            messageText,
            topContainer,
            mnemonicContainer,
            titleContainer,
            titleStyle,
        } = styles;

        const { navigation } = this.props;

        if ( this.state.loading ) {
            return(
                <View style={ container }>
                    <LoadingScreen>
                        <Text style={ messageText }>
                            Creating your encrypted private keys...
                        </Text>
                    </LoadingScreen>
                </View>
            );
        }

        return (
            <View style={ container }>
                <ImageBackground 
                    source={require('../../assets/topLogo.png')} 
                    style={{ width:'100%', height:'100%', flex: 1 }}
                    resizeMode='cover'
                >
                    <View>
                        <View style={ titleContainer }>
                            <Text style={ titleStyle }> Awesome! </Text>
                        </View>

                        <View style={ topContainer }>
                            <Image 
                                style={{ height: 190, width: 335}}
                                source={require('../../assets/SeedWarning.png')}
                            />
                        </View>

                        <View style={ mnemonicContainer }>
                            <View style={{ marginLeft: 20, marginRight: 20 }}>
                                <MnemonicDisplay mnemonic={this.state.mnemonic} />
                            </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <MattizButton 
                                title={"Ready !"}
                                onPress={ () => navigation.navigate('Dashboard')}
                            />
                        </View>
                    </View>
            </ImageBackground>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageText: {
        color: '#A3D164', 
        fontFamily: 'Raleway',
        fontSize: 22,
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30
    },
    titleContainer: {
        marginTop: 110,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mnemonicContainer : {
        marginTop: 15, 
        height: 300, 
        width: '100%'
    },
    titleStyle: {
        fontFamily: 'Raleway',
        fontSize: 32,
        color: '#040026'
    },
});

const mapDispatchtoProps = dispatch => ({
    loadPlaidInfo: () => dispatch(loadPlaidInfo()),
});

const MapStateToProps = state => {
    const { user, token, error } = state.auth;
    return {
        user,
        token,
        error
    };
}

export default connect(MapStateToProps, mapDispatchtoProps)(withNavigationFocus(GenerateWallet));
