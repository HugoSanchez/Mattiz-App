import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  Button } from 'react-native-elements';

import firebase from 'firebase';

export default class LoginForm extends Component {

    onButtonPress() {
        firebase.auth.signInWithEmailAndPassword("hugo@gmail.com", "superPassword")
            .then(res => console.log(res))
            .catch(()=> {
                firebase.auth.createUserWithEmailAndPassword("hugo@gmail.com", "superPassword")
                    .then(res => console.log(res))
                    .catch(() => {
                        console.log("Authentication Failed.")
                    });
            });
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text> This is Login Form </Text>

                <Button onPress={ this.onButtonPress.bind(this) }> Login </Button>
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