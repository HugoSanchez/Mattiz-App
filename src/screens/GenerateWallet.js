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
import MnemonicDisplay from '../components/MnemonicDisplay';


class GenerateWallet extends Component {

    state = {
        loading: true,
        encryptionProgress: 0,
        mnemonic: [""],
        encryptedKeys: null
    }

    async componentWillMount() {
        
        // Generate a mnemonic seed phrase using Bitcoin bip39 standard.
        let mnemonic = await bip39.generateMnemonic()
        console.log(mnemonic.split(' '))

        // Use the same mnemonic to generate a Ethereum Wallet.
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);

        // Encrypt wallet using password.
        let encrypted = await wallet.encrypt(this.props.user.password, this.encryptionProgress)

        // Stop loading, set mnemonic and encrypted wallet.
        this.setState({ loading: false, encryptedKeys: encrypted, mnemonic: mnemonic.split(' ')})
        console.log('Complete')
    }

    encryptionProgress(progress) {
        console.log(progress)
    }

    render() {
        const { 
            container,
            messageText,
            topContainer,
            mnemonicContainer,
            titleContainer,
            titleStyle,
            textStyle
        } = styles;

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
                        <View>
                            <View style={ titleContainer }>
                                <Text style={ titleStyle }> Awesome! </Text>
                            </View>
                            <View style={ topContainer }>
                                <Text>
                                    <Text style={ textStyle } suppressHighlighting={true}> 
                                        Now, pay attention because this is very important: 
                                        This set of words control your private keys, and your private keys control your money. 
                                        ¡ Make sure to save them somewhere save (not your computer, not yout phone, no screenshots neither)! 
                                        Remember, we don't have a copy of it, if you lose this, you lose your funds! 
                                    </Text>
                                </Text>
                            </View>


                            <View style={ mnemonicContainer }>
                                <View style={{ marginLeft: 20, marginRight: 20 }}>
                                    <MnemonicDisplay mnemonic={this.state.mnemonic} />
                                </View>
                            </View>

                        </View>
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
    messageText: {
        color: '#A3D164', 
        fontFamily: 'Raleway-Bold',
        fontSize: 28,
        marginTop: 50
    },
    titleContainer: {
        marginTop: 110,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        marginTop: 30,
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 2,
        borderColor: '#E5F2D4',
    },
    mnemonicContainer : {
        marginTop: 30, 
        height: 300, 
        width: '100%'
    },
    titleStyle: {
        fontFamily: 'Raleway',
        fontSize: 32,
        color: '#040026'
    },
    textStyle: {
        fontFamily: 'Raleway',
        fontSize: 16,
        color: '#040026'
    }
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
