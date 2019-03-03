import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {  Button, Input } from 'react-native-elements';
import firebase from 'firebase';

export default class SignUpForm extends Component {

    state = {
        username: '',
        email: '',
        password: ''
    }

    onButtonPress() {
        console.log("Hello")
        const { username, email } = this.state;
        firebase.auth().createUserWithEmailAndPassword("hugos@gmail.com", "superPassword")
         .then(res => {
             console.log(res)
         })
         .catch(() => {
             console.log("Authentication Failed.")
        });
    }

    render() {
        return (
            <View style={ styles.container }>
                <Input 
                    placeholder='Username ...'
                    onChangeText={ value => this.setState({ username: value }) }
                    style={ styles.input }
                />
                <Input 
                    placeholder='Email ...'
                    onChangeText={ value => this.setState({ email: value }) }
                    style={ styles.input }
                />
                <Input 
                    placeholder='Password ...'
                    onChangeText={ value => this.setState({ password: value }) }
                    style={ styles.input }
                />
                <Button 
                    title='Ignite !'
                    onPress={ this.onButtonPress.bind(this) }
                    style={{ margin: 10 }}
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
        margin: 30,
        padding: 20
    }
})
