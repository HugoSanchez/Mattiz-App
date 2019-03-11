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
        username: null,
        password: '',
        confirmPassword: '',
        formStatus: false,
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
        const {container, input, signUpButton, viewStyle } = styles;
        if ( this.state.formStatus == false ) {
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
                        onPress={() => this.setState({ formStatus: 'username' }) }
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

        if ( this.state.formStatus === 'username') {
            return (
                <View style={ container }>
                    <ImageBackground 
                        source={require('../assets/LoginBackground.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                    <View style={ viewStyle }>
                        <Input 
                            placeholder="What's your name?"
                            inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                            placeholderTextColor='gray'
                            onChangeText={ value => this.setState({ username: value }) }
                            fontStyle={ this.state.password? 'italic' : 'normal' }
                            onFocus={() => this.setState({ isFocused: true })}
                            style={ input }
                        />
                    </View>
                    <Button 
                        title='Next !'
                        titleStyle={{ color: '#03001A' }}
                        buttonStyle={{ margin: 12, marginTop: this.state.isFocused ? 10 : 347, height: 47, backgroundColor: 'transparent' }}
                        onPress={ () => this.setState({ formStatus: 'password' }) }
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
        
        if ( this.state.formStatus === 'password') {
            return (
                <View style={ container }>
                    <ImageBackground 
                        source={require('../assets/LoginBackground.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                    <View style={ viewStyle }>
                        <Input 
                            placeholder="Choose your Password"
                            inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                            placeholderTextColor='gray'
                            onChangeText={ value => this.setState({ password: value }) }
                            fontStyle={ this.state.username ? 'italic' : 'normal' }
                            onFocus={() => this.setState({ isFocused: true })}
                            style={ input }
                        />
                    </View>
                    <Button 
                        title='Next !'
                        titleStyle={{ color: '#03001A' }}
                        buttonStyle={{ margin: 12, marginTop: this.state.isFocused ? 10 : 347, height: 47, backgroundColor: 'transparent' }}
                        onPress={ () => this.setState({ formStatus: 'confirm' }) }
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

        if ( this.state.formStatus === 'confirm') {
            return (
                <View style={ container }>
                    <ImageBackground 
                        source={require('../assets/LoginBackground.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                    <View style={ viewStyle }>
                        <Input 
                            placeholder="Confirm your Password"
                            inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                            placeholderTextColor='gray'
                            onChangeText={ value => this.setState({ password: value }) }
                            fontStyle={ this.state.username ? 'italic' : 'normal' }
                            onFocus={() => this.setState({ isFocused: true })}
                            style={ input }
                        />
                    </View>
                    <Button 
                        title='Sign Up'
                        titleStyle={{ color: '#03001A' }}
                        buttonStyle={{ margin: 12, marginTop: this.state.isFocused ? 10 : 347, height: 47, backgroundColor: 'transparent' }}
                        onPress={ () => this.setState({ formStatus: 'confirm' }) }
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
    viewStyle: {
        marginTop: 315, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 2,
        margin: 12, 
        height: 45
    },
    signUpButton: {
        marginTop: 700,
        margin: 12, 
        backgroundColor: 'transparent',
        height: 45
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
