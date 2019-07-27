import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, Image, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

// Custom Components.
import PalmButton from '../../components/common/PalmButton';
import LoadingScreen from '../../components/LoadingScreen';

// Connect.
import { connect } from 'react-redux';

// Redux Actions and Auth Functions. 
import { authCreateUser, setTokenInMemory } from '../../api/auth';
import { setUserInReduxState } from '../../actions';
import colors from '../../constants/colors';

// Dims. 
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

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

        const { 
            container, 
            input, 
            viewStyle, 
            textInput, 
            placeholder,
            imageStyle
        } = styles;

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
                            source={require('../../assets/Palm-Logo-Self.png')} 
                            style={ imageStyle }
                        />
                        <View style={{ marginTop: 500 }}>
                            <PalmButton 
                                iconName={'log-in'}
                                onPress={() => this.setState({ formStatus: 'username' })}
                                title={'Get on board!'}
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
                        style={{ width:'100%', height:'100%' }}
                        resizeMode='cover'
                    >
                        <Image 
                            source={require('../../assets/Palm-Logo-Self.png')} 
                            style={ imageStyle }
                        />
                        <View style={ viewStyle }>
                            <Input 
                                placeholder="What's your name?"
                                inputContainerStyle={{ borderBottomWidth: 0, marginTop: 20 }}
                                placeholderTextColor='#464646'
                                value={this.state.username}
                                onChangeText={ value => this.setState({ username: value }) }
                                fontStyle={ 'italic' }
                                onFocus={() => this.setState({ isFocused: true })}
                                inputStyle={ this.state.username ? textInput : placeholder }
                                style={ input }
                            />
                        </View>
                        <View style={{ marginTop: this.state.isFocused ? 0 : 320}}>
                            <PalmButton 
                                iconName={'arrow-right'}
                                onPress={() => this.setState({ formStatus: 'password' })}
                                title={'Continue'}
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
                            source={require('../../assets/Palm-Logo-Self.png')} 
                            style={ imageStyle }
                        />
                        <View style={ viewStyle }>
                            <Input 
                                placeholder="Choose your password"
                                inputContainerStyle={{ borderBottomWidth: 0, marginTop: 20 }}
                                placeholderTextColor='#464646'
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={ value => this.setState({ password: value }) }
                                fontStyle={ 'italic' }
                                inputStyle={ this.state.password ? textInput : placeholder }
                                onFocus={() => this.setState({ isFocused: true })}
                                style={ input }
                            />
                        </View>
                        <View style={{ marginTop: this.state.isFocused ? 0 : 320}}>
                            <PalmButton 
                                iconName={'arrow-right'}
                                onPress={() => this.setState({ formStatus: 'confirm' })}
                                title={'Continue'}
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
                            source={require('../../assets/Palm-Logo-Self.png')} 
                            style={ imageStyle }
                        />
                        <View style={ viewStyle }>
                            <Input 
                                placeholder="Confirm password"
                                inputContainerStyle={{ borderBottomWidth: 0, marginTop: 20 }}
                                placeholderTextColor='#464646'
                                value={this.state.confirmPassword}
                                secureTextEntry={true}
                                onChangeText={ value => this.setState({ confirmPassword: value }) }
                                fontStyle={ 'italic' }
                                inputStyle={ this.state.confirm ? textInput : placeholder }
                                onFocus={() => this.setState({ isFocused: true })}
                                style={ input }
                            />
                        </View>
                        <View style={{ marginTop: this.state.isFocused ? 0 : 320}}>
                            <PalmButton 
                                iconName={'check-circle'}
                                onPress={() => this.onButtonPress()}
                                title={'Sign up!'}
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
        backgroundColor: '#FFF'
    },
    viewStyle: {
        flexDirection: 'row',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '35%', 
        marginBottom: '2%',
        height: '5%',
        borderBottomWidth: 1, 
        borderBottomColor: 'gray',
    },
    placeholder: {
        fontFamily: 'Raleway-Light', 
        fontSize: 18 
    },
    textInput: { 
        fontFamily: 'Raleway-LightItalic', 
        fontSize: 18, 
        color: colors.primaryBlue 
    },
    imageStyle: { 
        width: 200, 
        height: 120, 
        alignSelf: 'center', 
        marginTop: '20%' }
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
