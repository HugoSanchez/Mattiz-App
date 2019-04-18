import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// Crypto imports
import 'ethers/dist/shims.js'; // Required 'Shim' for ethers.js to work in React Native.
import { ethers } from 'ethers';

import { getTokenFromMemory } from '../../api/auth';

class SendForm extends Component {
    constructor(props) {
        super(props);
        this.sendTx = this.sendTx.bind(this);
    }

    async componentWillMount() {
        let wallet = await getTokenFromMemory('wallet')
        console.log('wallet: ', wallet)
        console.log('user: ', this.props.user )
    }

    async sendTx() {
        // Set initial state back in redux.
        this.props.deleteUserFromReduxState();
        // Remove token from memory.
        removeTokenFromMemory('token');
        // Navigate user out.
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={ container }>
            <ImageBackground 
                source={require('../../assets/topLogo.png')} 
                style={{ width:'100%', height:'100%', flex: 1 }}
                resizeMode='cover'
            >
                <View style={ viewStyle }>
                <MattizButton
                    title={'Link more Accounts'}
                    onPress={() => navigation.navigate('PlaidLink')} 
                />

                <MattizButton
                    title={'Send'}
                    onPress={() => this.sendTx()} 
                />
                </View> 
            </ImageBackground>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})

const MapStateToProps = state => {
    const { user, error } = state.auth;
    return {
        user,
        error
    };
}

export default connect(MapStateToProps, {})(SendForm);