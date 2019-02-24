import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {  Button } from 'react-native-elements';

export default class LoginForm extends Component {

    onLogin() {
        this.props.navigation.navigate('Dashboard')
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text> This is Login Form </Text>

                <Button onPress={ this.onLogin() }> Login </Button>
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