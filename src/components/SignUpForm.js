import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  Button } from 'react-native-elements';

export default class SignUpForm extends Component {

    onSignUp() {
        //this.props.navigation.navigate('Dashboard')
        console.log('SignUp')
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text> This is SignUp Form </Text>

                <Button onPress={ this.onSignUp() }> Sign Up </Button>
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
