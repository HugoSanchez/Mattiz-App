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
        loading: false,
        encryptionProgress: 0,
        mnemonic: ["jaguar"],
        encryptedKeys: null
    }

    async componentWillMount() {
        /** 
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
        */
    }

    encryptionProgress(progress) {
        console.log(progress)
    }

    render() {
        const { 
            container,
            messageText,
            balanceBoxContainer,
            boxContainer,
            splitBox,
            smalleBoxContainer,
            statusAvatar,
            textStyle
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
                        <View style={styles.container}>
                            <View style={styles.balanceBoxContainer}>
                                <Text style={styles.textStyle}> You are now looged in! </Text>
                            </View>

                            <View style={styles.boxContainer}>
                                <View style={styles.statusAvatar}>

                                </View>
                            </View>

                            <View style={[styles.boxContainer, styles.splitBox ]}>
                                <View style={styles.smalleBoxContainer}>
                                    <Text style={textStyle}> 1. {this.state.mnemonic[0]}</Text>
                                </View>

                                <View style={styles.smalleBoxContainer}>

                                </View>

                                <View style={styles.smalleBoxContainer}>

                                </View>
                            </View>

                            <View style={[styles.boxContainer, styles.splitBox ]}>
                                <View style={styles.smalleBoxContainer}>
                                    
                                </View>
                                
                                <View style={styles.smalleBoxContainer}>

                                </View>

                                <View style={styles.smalleBoxContainer}>

                                </View>
                            </View>

                            <View style={[styles.boxContainer, styles.splitBox ]}>
                                <View style={styles.smalleBoxContainer}>
                                    
                                </View>
                                
                                <View style={styles.smalleBoxContainer}>

                                </View>

                                <View style={styles.smalleBoxContainer}>

                                </View>
                            </View>

                            <View style={[styles.boxContainer, styles.splitBox ]}>
                                <View style={styles.smalleBoxContainer}>
                                    
                                </View>
                                
                            </View>

                            <View style={styles.boxContainer}>
                                <View style={styles.statusAvatar}>

                                </View>
                            </View>

                            <View style={styles.boxContainer}>
                                <View style={styles.statusAvatar}>

                                </View>
                            </View>

                            <View style={styles.boxContainer}>
                                <View style={styles.statusAvatar}>

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
    balanceBoxContainer: {
        flex: 4,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderRadius: 2,
        borderColor: '#E5F2D4',
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    splitBox: {
        flexDirection: 'row',
        margin: 5
    },
    smalleBoxContainer: {
        flex: 1,
        margin: 5,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#FDFFFE',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    statusAvatar: {
        width: 20,
        height: 20, 
        borderRadius: 10,
        backgroundColor: '#E5F2D4',
        marginLeft: 16
    },
    textStyle: {
        fontFamily: 'Raleway-Light',
        fontSize: 16
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
