import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {  Button, Input } from 'react-native-elements';



export default class SignUpForm extends Component {

    state = {
        authCode: ''
    }

    onChangeText(authCode) {
        this.setState({ authCode })
    }

    render() {
        return (
            <View style={ styles.container }>
                <Button title='Sign Up' onPress={ console.log("SignUp") }/>
                <Input 
                    placeholder='Input Code'
                    onChangeText={ value => this.onChangeText(value) }
                    style={ styles.input }
                />
                <Button 
                    title='Confirm User'
                    onPress={ console.log("SignUp") }
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
