import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import {  Button, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';
import firebase from 'firebase';

import { setUserInMemory } from '../api/auth';
import { setUser } from '../actions/AuthActions';

class SignUpForm extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        renderForm: false,
        isFocused: false
    }

    onButtonPress() {
        const { username, email } = this.state;
        const user = username + ',' + email;
        firebase.auth().createUserWithEmailAndPassword("hugo@gmail.com", "superPassword")
         .then(res => {
             console.log(res)
             setUserInMemory(user)
             this.props.setUser({username, email})
         })
         .catch(() => {
             console.log("Authentication Failed.")
        });
    }

    render() {
        const {container, input, signUpButton } = styles;
        if ( this.state.renderForm == false ) {
            return (
                <View style={ container }>
                    <ImageBackground 
                        source={require('../assets/LoginBackground.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                    <Button 
                        title='Sign Up !'
                        titleStyle={{ color: '#03001A' }}
                        buttonStyle={ signUpButton }
                        onPress={() => this.setState({ renderForm: true }) }
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: ['rgba(214, 213, 213, 1)', 'rgba(163, 209, 100, .4)'],
                            start: { x: 0.3, y: 0.5 },
                            end: { x:1, y: 0.5 },
                        }}
                    />
                    </ImageBackground>
                </View>
            )
        } 

        return (
            <View style={ container }>
                <ImageBackground 
                    source={require('../assets/LoginBackground.png')} 
                    style={{ width:'100%', height:'100%', flex: 1 }}
                    resizeMode='cover'
                >
                    <View style={{ marginTop: 300 }}>
                    <Input 
                        placeholder='User ...'
                        inputContainerStyle={{ borderBottomColor: 'white' }}
                        placeholderTextColor='white'
                        onChangeText={ value => this.setState({ username: value }) }
                        fontStyle={ this.state.username.length == 0 ? 'italic' : 'normal' }
                        onFocus={() => this.setState({ isFocused: true })}
                        style={ input }
                    />
                    <Input 
                        placeholder='Email ...'
                        inputContainerStyle={{ borderBottomColor: 'white' }}
                        placeholderTextColor='white'
                        onChangeText={ value => this.setState({ email: value }) }
                        fontStyle={ this.state.email.length == 0 ? 'italic' : 'normal' }
                        style={ input }
                    />
                    <Input 
                        placeholder='Password ...'
                        inputContainerStyle={{ borderBottomColor: 'white' }}
                        placeholderTextColor='white'
                        onChangeText={ value => this.setState({ password: value }) }
                        fontStyle={ this.state.password.length == 0 ? 'italic' : 'normal' }
                        type='password'
                        style={ input }
                    />
                    <Button 
                        title='Sign Up !'
                        titleStyle={{ color: '#03001A' }}
                        buttonStyle={{ margin: 12, marginTop: this.state.isFocused ? 10 : 300 }}
                        onPress={ this.onButtonPress.bind(this) }
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: ['rgba(214, 213, 213, 1)', 'rgba(163, 209, 100, .4)'],
                            start: { x: 0.3, y: 0.5 },
                            end: { x:1, y: 0.5 },
                        }}
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
        backgroundColor: '#03001A'
    },
    input: {
        height: 50,
        backgroundColor: '#ededed',
        margin: 30,
        padding: 20
    },
    signUpButton: {
        marginTop: 700,
        margin: 12, 
        backgroundColor: 'transparent',
        height: 47
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

export default connect(MapStateToProps, { setUser })(SignUpForm);
