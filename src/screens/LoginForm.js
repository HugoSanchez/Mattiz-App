import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {  Button, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { verifyUser } from '../api/auth';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            loading: false,
            error: ''
        }
    }

    componentWillMount() {
        // TODO:
        // Render welcome message with user name.
        // Render error message.
        console.log(this.props)
    }

    onButtonPress() {
        // Clean input and set spinner.
        this.setState({ password: null, loading: true})
        // Call '/login' endpoint with password and user id.
        verifyUser(this.props.user._id, this.state.password).then(res => {
            // If succesful,
            if (res.auth) {
                // Navigate user inside the app.
                this.props.navigation.navigate('Dashboard')
            } else {
                // In not, re-render form and show error message.
                this.setState({ loading: false, error: 'Invalid credentials, please try again.'})
            }
        })
    }

    render() {
        const { container, input, viewStyle } = styles;
        return (
            <View style={ container }>
                <ImageBackground 
                    source={require('../assets/LoginBackground.png')} 
                    style={{ width:'100%', height:'100%', flex: 1 }}
                    resizeMode='cover'
                >
                {
                    this.state.loading ?
                    // If loading == true, render spinner,
                    <ActivityIndicator size='large' />
                    : // else, render form and button.
                    <View>
                        <View style={ viewStyle }>
                            <Input 
                                placeholder="Password "
                                inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                                placeholderTextColor='gray'
                                secureTextEntry={true}
                                onChangeText={ value => this.setState({ password: value }) }
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
                    </View>
                }
                </ImageBackground>
            </View>
        )
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
        marginTop: 281, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 2,
        margin: 12, 
        height: 45
    },
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