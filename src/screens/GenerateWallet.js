import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

// Crypto imports
import bip39 from 'react-native-bip39';
import 'ethers/dist/shims.js'; // Required 'Shim' for ethers.js to work in React Native.
import { ethers } from 'ethers';

// Custom components
import LoadingScreen from '../components/LoadingScreen';


class GenerateWallet extends Component {

    state = {
        loading: true,
        encryptionProgress: 0,
        mnemonic: [],
        encryptedKeys: null
    }

    async componentWillMount() {

        // Generate a mnemonic seed phrase using Bitcoin bip39 standard.
        let mnemonic = await bip39.generateMnemonic()

        // Use the same mnemonic to generate a Ethereum Wallet.
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);

        // Encrypt wallet using password.
        let encrypted = await wallet.encrypt(this.props.user.password, this.encryptionProgress)

        // Stop loading, set mnemonic and encrypted wallet.
        this.setState({ loading: false, encryptedKeys: encrypted, mnemonic: mnemonic.split('')})
        console.log('Complete')
    }

    async onButtonPress() {
        
    }

    encryptionProgress(progress) {
        console.log(progress)
    }

    render() {
        const { 
            container,
            titleStyle,
            buttonStyle,
            messageText
        } = styles;

        console.log(this.props.user)

        return (
            <View style={ container }>
                <ImageBackground 
                    source={require('../assets/topLogo.png')} 
                    style={{ width:'100%', height:'100%', flex: 1 }}
                    resizeMode='cover'
                >
                    {
                        this.state.loading ?
                        <LoadingScreen>
                            <Text style={ messageText }>
                                CREATING YOU PRIVATE KEYS...
                            </Text>
                        </LoadingScreen>
                        :
                        null
                    }
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        color: 'white', 
        fontFamily: 'Raleway'
    },
    buttonStyle: {
        margin: 20, 
        marginTop: 690, 
        height: 60, 
        borderRadius: 10,
        backgroundColor: 'transparent'
    },
    messageText: {
        color: '#A3D164', 
        fontFamily: 'Raleway',
        fontSize: 36,
        marginTop: 50
    },
});

const MapStateToProps = state => {
    const { user, token, error } = state.auth;
    return {
        user,
        token,
        error
    };
}

export default connect(MapStateToProps, null)(GenerateWallet);
