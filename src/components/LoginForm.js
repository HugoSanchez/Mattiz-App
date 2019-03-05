import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import {  Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';

import firebase from 'firebase';

class LoginForm extends Component {

    onButtonPress() {
        firebase.auth().signInWithEmailAndPassword("hugo@gmail.com", "superPassword")
         .then(() => this.props.navigation.navigate('Dashboard'))
         .catch(()=> {
            console.log('Authentication Failed.')
        });
    }

    render() {
        return (
            <ImageBackground source={require('../assets/LoginBackground.png')}>
                <View style={ styles.container }>
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
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    }
})

const MapStateToProps = state => {
    const { user, token, error } = state.auth;
    return {
        user,
        token,
        error
    };
}

export default connect(MapStateToProps, {})(LoginForm);