import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

// Crypto imports
import bip39 from 'react-native-bip39';
import 'ethers/dist/shims.js'; // Required 'Shim' for ethers.js to work in React Native.
import { ethers } from 'ethers';

const Spinner = require('react-native-spinkit');

class GenerateWallet extends Component {

    state = {
        loading: false,
        encryptionProgress: 0,
    }

    async onButtonPress() {
        // Set loading = true.
        this.setState({ loading: true })

        // Generate a mnemonic seed phrase using Bitcoin bip39 standard.
        let mnemonic = await bip39.generateMnemonic()

        // Use the same mnemonic to generate a Ethereum Wallet.
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);
        console.log(wallet)

        // Encrypt wallet using password.
        let encrypted = await wallet.encrypt(this.props.user.password, this.encryptionProgress)
        console.log('Encrypted wallet object: ', encrypted)

        this.setState({ loading: false })
    }

    encryptionProgress(progress) {
        console.log(progress)
    }

    render() {
        const { 
            container,
            titleStyle,
            buttonStyle
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
                        <View style={ container }>
                            <Spinner 
                                style={{ alignSelf: 'center' }} 
                                isVisible={true} 
                                size={100} 
                                type='CircleFlip' 
                                color='#A3D164'
                            />
                        </View>
                        :
                        <Button 
                            title='Get Keys'
                            titleStyle={ titleStyle }
                            buttonStyle={ buttonStyle }
                            onPress={ () => this.onButtonPress() }
                            ViewComponent={ LinearGradient }
                            linearGradientProps={{
                                colors: ['rgba(163, 209, 100, 1)', 'rgba(4, 0, 38, 1)'],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                        />
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
