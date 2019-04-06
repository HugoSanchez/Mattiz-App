import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

// Custom Components.
import MattizButton from '../components/common/MattizButton';

// Connect.
import { connect } from 'react-redux';

// Redux Actions and Auth Functions. 
import { authCreateUser, setTokenInMemory } from '../api/auth';
import { setUserInReduxState } from '../actions';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            confirmPassword: null,
            formStatus: false,
            isFocused: false,
            loading: false
        }
    }

    onButtonPress() {
        // Deconstruct state.
        const { username, password, confirmPassword } = this.state;
        // Check if passwords are correct.
        if ( password == confirmPassword ) {
            // If so, call the '/register' endpoint which returns token.
            authCreateUser(username, password).then(res => {
                if (res.data.auth) {
                    // If token, save it in memory
                    setTokenInMemory('token', res.data.token)
                    // And set user in redux state.
                    this.props.setUserInReduxState(res.data.user)
                    // Navigate user to onboarding set up. 
                    this.props.navigation.navigate('Welcome')
                }
            })
        }
    }

    render() {
        const { container, input, viewStyle } = styles;

        if ( this.state.formStatus == false ) {
            return (
                <View style={ container }>
                    <ImageBackground 
                        source={require('../assets/whiteBackground.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                    <View style={{ marginTop: 700 }}>
                        <MattizButton 
                            title={'Set Sail !'}
                            titleStyle={{ color: '#040026'}}
                            onPress={ () => this.setState({ formStatus: 'username' })}
                            linearColor={'rgba(214, 213, 213, 1)'}
                        />
                    </View>
                    </ImageBackground>
                </View>
            );
        } 
        
        //  SET USERNAME   //
        if ( this.state.formStatus === 'username') {
            return (
                <View style={ container }>
                    <ImageBackground 
                        source={require('../assets/whiteBackground.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                    <View style={ viewStyle }>
                        <Input 
                            placeholder="What's your name?"
                            inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                            placeholderTextColor='gray'
                            value={this.state.username}
                            onChangeText={ value => this.setState({ username: value }) }
                            fontStyle={ this.state.password? 'italic' : 'normal' }
                            onFocus={() => this.setState({ isFocused: true })}
                            style={ input }
                        />
                    </View>
                    <View style={{ marginTop: this.state.isFocused ? 10 : 347}}>
                        <MattizButton 
                            title={'Next !'}
                            titleStyle={{ color: '#040026'}}
                            onPress={ () => this.setState({ formStatus: 'password' })}
                            linearColor={'rgba(214, 213, 213, 1)'}
                        />
                    </View>
                    </ImageBackground>
                </View>
            );
        }

        //  SET PASSWORD   //
        if ( this.state.formStatus === 'password') {
            return (
                <View style={ container }>
                    <ImageBackground 
                        source={require('../assets/whiteBackground.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                    <View style={ viewStyle }>
                        <Input 
                            placeholder="Choose your Password"
                            inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                            placeholderTextColor='gray'
                            value={this.state.password}
                            secureTextEntry={true}
                            onChangeText={ value => this.setState({ password: value }) }
                            fontStyle={ this.state.password ? 'italic' : 'normal' }
                            onFocus={() => this.setState({ isFocused: true })}
                            style={ input }
                        />
                    </View>
                    <View style={{ marginTop: this.state.isFocused ? 10 : 347}}>
                        <MattizButton 
                            title={'Next !'}
                            titleStyle={{ color: '#040026'}}
                            onPress={ () => this.setState({ formStatus: 'confirm' })}
                            linearColor={'rgba(214, 213, 213, 1)'}
                        />
                    </View>
                    </ImageBackground>
                </View>
            );
        }

        //   CONFIRM PASSWORD   //
        if ( this.state.formStatus === 'confirm') {
            return (
                <View style={ container }>
                    <ImageBackground 
                        source={require('../assets/whiteBackground.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                    <View style={ viewStyle }>
                        <Input 
                            placeholder="Confirm your Password"
                            inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                            placeholderTextColor='gray'
                            value={this.state.confirmPassword}
                            secureTextEntry={true}
                            onChangeText={ value => this.setState({ confirmPassword: value }) }
                            fontStyle={ this.state.confirmPassword ? 'italic' : 'normal' }
                            onFocus={() => this.setState({ isFocused: true })}
                            style={ input }
                        />
                    </View>
                    <View style={{ marginTop: this.state.isFocused ? 10 : 347}}>
                        <MattizButton 
                            title={'Sign Up !'}
                            titleStyle={{ color: '#040026'}}
                            onPress={ this.onButtonPress.bind(this) }
                            linearColor={'rgba(214, 213, 213, 1)'}
                        />
                    </View>
                    </ImageBackground>
                </View>
            );
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
        marginTop: 281, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 2,
        margin: 12, 
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

export default connect(MapStateToProps, { setUserInReduxState })(SignUpForm);
