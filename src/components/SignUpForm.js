import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {  Button, Input } from 'react-native-elements';

/* AWS Auth imports */
import Amplify, { Auth } from 'aws-amplify';
import awsmobile  from '../aws-exports';
Amplify.configure(awsmobile);

export default class SignUpForm extends Component {

    state = {
        authCode: ''
    }

    onChangeText(authCode) {
        this.setState({ authCode })
    }

    signUp() {
        Auth.signUp({
            username: 'superUserName',
            password: 'superSecretPassword',
            attributes: {
                phone_number: '+34660015378',
                email: 'supercoolemail@gmail.com'
            }
        })
        .then( res => {
            console.log('successful signup: ', res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    confirmUser() {
        const { authCode } = this.state
        Auth.confirmSignUp('superUserName', authCode)
            .then(res => {
                console.log('succesful confirmation: ', res)
            })
            .catch(err => {
                console.log('error confirming user: ', err)
            })
    }

    render() {
        return (
            <View style={ styles.container }>
                <Button title='Sign Up' onPress={ this.signUp.bind(this) }/>
                <Input 
                    placeholder='Input Code'
                    onChangeText={ value => this.onChangeText(value) }
                    style={ styles.input }
                />
                <Button 
                    title='Confirm User'
                    onPress={ this.confirmUser.bind(this) }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    },
    input: {
        height: 50,
        backgroundColor: '#ededed',
        marginVertical: 10
    }
})
