import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  Button } from 'react-native-elements';

export default class LoginForm extends Component {

    render() {
        return (
            <View style={ styles.container }>
                <Text> This is Login Form </Text>

                <Button onPress={ console.log("Login") }> Login </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
})