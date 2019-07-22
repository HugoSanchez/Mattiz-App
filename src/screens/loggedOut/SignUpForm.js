import React, { Component } from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

// Custom Components.
import MattizButton from '../../components/common/MattizButton';
import LoadingScreen from '../../components/LoadingScreen';

// Connect.
import { connect } from 'react-redux';

// Redux Actions and Auth Functions. 
import { authCreateUser, setTokenInMemory } from '../../api/auth';
import { setUserInReduxState } from '../../actions';

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
            // Set loading == true.
            this.setState({ loading: true })
            // If so, call the '/register' endpoint which returns token.
            authCreateUser(username, password).then(res => {
                if (res.data.auth) {
                    console.log('Data: ', res.data)
                    // If token, save it in memory
                    setTokenInMemory('token', res.data.token)
                    // And set user in redux state.
                    this.props.setUserInReduxState(res.data.user)
                    // Navigate user to onboarding set up.
                    this.props.navigation.navigate('Welcome')
                }
            });
        }
    }

    render() {
        const { container, input, viewStyle } = styles;

        if ( this.state.loading ) {
            return (
                <View style={ container }>
                    <LoadingScreen />
                </View>
            );
        }

        if ( this.state.formStatus == false ) {
            return (
                <View style={ container }>
                    <ImageBackground 
                        source={require('../../assets/LoginForm.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                        <Image 
                            source={require('../../assets/doubleLogo.png')} 
                            style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 55 }}
                        />
                        <View style={{ marginTop: 440 }}>
                            <MattizButton 
                                title={'Set Sail !'}
                                titleStyle={{ color: 'white'}}
                                onPress={ () => this.setState({ formStatus: 'username' })}
                                linearColor={'#040026'}
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
                        source={require('../../assets/LoginForm.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                        <Image 
                            source={require('../../assets/doubleLogo.png')} 
                            style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 55 }}
                        />
                        <View style={ viewStyle }>
                            <Input 
                                placeholder="What's your name?"
                                inputContainerStyle={{ borderBottomColor: '#040026', marginTop: 40 }}
                                placeholderTextColor='gray'
                                value={this.state.username}
                                onChangeText={ value => this.setState({ username: value }) }
                                fontStyle={ this.state.password? 'italic' : 'normal' }
                                onFocus={() => this.setState({ isFocused: true })}
                                style={ input }
                            />
                        </View>
                        <View style={{ marginTop: this.state.isFocused ? 20 : 345}}>
                            <MattizButton 
                                title={'Next !'}
                                titleStyle={{ color: 'white'}}
                                onPress={ () => this.setState({ formStatus: 'password' })}
                                linearColor={'#040026'}
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
                        source={require('../../assets/LoginForm.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                        <Image 
                            source={require('../../assets/doubleLogo.png')} 
                            style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 55 }}
                        />
                        <View style={ viewStyle }>
                            <Input 
                                placeholder="Choose your Password"
                                inputContainerStyle={{ borderBottomColor: '#040026', marginTop: 40 }}
                                placeholderTextColor='gray'
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={ value => this.setState({ password: value }) }
                                fontStyle={ this.state.password ? 'italic' : 'normal' }
                                onFocus={() => this.setState({ isFocused: true })}
                                style={ input }
                            />
                        </View>
                        <View style={{ marginTop: this.state.isFocused ? 20 : 345}}>
                            <MattizButton 
                                title={'Next !'}
                                titleStyle={{ color: 'white'}}
                                onPress={ () => this.setState({ formStatus: 'confirm' })}
                                linearColor={'#040026'}
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
                        source={require('../../assets/LoginForm.png')} 
                        style={{ width:'100%', height:'100%', flex: 1 }}
                        resizeMode='cover'
                    >
                        <Image 
                            source={require('../../assets/doubleLogo.png')} 
                            style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 55 }}
                        />
                        <View style={ viewStyle }>
                            <Input 
                                placeholder="Confirm your Password"
                                inputContainerStyle={{ borderBottomColor: '#040026', marginTop: 40 }}
                                placeholderTextColor='gray'
                                value={this.state.confirmPassword}
                                secureTextEntry={true}
                                onChangeText={ value => this.setState({ confirmPassword: value }) }
                                fontStyle={ this.state.confirmPassword ? 'italic' : 'normal' }
                                onFocus={() => this.setState({ isFocused: true })}
                                style={ input }
                            />
                        </View>
                        <View style={{ marginTop: this.state.isFocused ? 20 : 345}}>
                            <MattizButton 
                                title={'Sign Up !'}
                                titleStyle={{ color: 'white'}}
                                onPress={ this.onButtonPress.bind(this) }
                                linearColor={'#040026'}
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
        backgroundColor: 'transparent',
    },
    viewStyle: {
        margin: '5%', 
        height: 55, 
        borderRadius: 10, 
    }
})

const mapDispatchtoProps = dispatch => ({
    setUserInReduxState: user => dispatch(setUserInReduxState(user))
});

const mapStateToProps = state => {
    const { user, token, error } = state.auth;
    return {
        user,
        token,
        error
    };
}

export default connect(mapStateToProps, mapDispatchtoProps)(SignUpForm);
