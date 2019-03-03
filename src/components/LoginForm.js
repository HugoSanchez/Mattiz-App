import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  Button } from 'react-native-elements';
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
            <View style={ styles.container }>
                <Text> Hello { this.props.user.username + "Alguien"}</Text>

                <Button 
                    title='Ignite !'
                    onPress={ this.onButtonPress.bind(this) }
                    style={{ margin: 10 }}
                />
            </View>
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