import React, { Component } from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';
import {  Input } from 'react-native-elements';
import { connect } from 'react-redux';

import MattizButton from '../components/common/MattizButton';

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
                    source={require('../assets/Background.jpeg')} 
                    style={{ width: '100%', height: '100%', flex: 1 }}
                    resizeMode={'cover'}
                >
                {
                    this.state.loading ?
                    // If loading == true, render spinner,
                    <ActivityIndicator size='large' />
                    : // else, render form and button.
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../assets/MattizLogo.png')} 
                            style={{ width: 200, height: 200, marginTop: 40 }}
                        />
                        <View style={[ viewStyle, { marginTop: 33, alignSelf: 'stretch' } ]}>
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
                        <View style={{ marginTop: this.state.isFocused ? 2 : 370, alignSelf: 'stretch' }}>
                            <MattizButton 
                                title={'Log In! '}
                                titleStyle={{ color: '#040026'}}
                                buttonStyle={{ height: 55, borderRadius: 10 }}
                                onPress={ () => this.onButtonPress.bind(this)}
                                linearColor={'rgba(214, 213, 213, 1)'}
                            />
                        </View>
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
        alignItems: 'center', 
        backgroundColor: '#fff'
    },
    input: {
        height: 50,
        backgroundColor: '#ededed',
        margin: 5,
        padding: 20
    },
    viewStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 2,
        margin: 5, 
        height: 50,
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