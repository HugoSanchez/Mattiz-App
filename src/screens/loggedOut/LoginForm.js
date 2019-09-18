import React, { Component } from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';
import {  Input } from 'react-native-elements';
import { connect } from 'react-redux';

// Components.
import LoadingScreen from '../../components/LoadingScreen';
import PalmButton from '../../components/common/PalmButton';

// Auth & Actions.
import { verifyUser } from '../../api/auth';
import { loadPlaidInfo, setUserInReduxState } from '../../actions';

import colors from '../../constants/colors';

///
/// Pending: Better handling incorrect passwords! 
/// 

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            loading: false,
            error: '',
            isFocused: false 
        }
    }

    componentWillMount() {
        // TODO:
        // Render welcome message with user name.
        // Render error message.
    }

    onButtonPress() {
        // Clean input and set spinner.
        this.setState({ password: null, loading: true});
        // Call '/login' endpoint with password and user id.
        verifyUser(this.props.user._id, this.state.password).then(res => {
            // If succesful,
            if (res.data.auth) {
                console.log('Verify: ', res.data)
                // Fire Plaid API calls.
                this.props.loadPlaidInfo();
                console.log('1')
                // Set user in Redux State.
                this.props.setUserInReduxState(res.data.user)
                console.log('2')
                // Navigate user inside the app.
                this.props.navigation.navigate('Dashboard')
                console.log('3')
            } else {
                // In not, re-render form and show error message.
                this.setState({ loading: false, error: 'Invalid credentials, please try again.'})
            }
        })
    }

    render() {
        const { 
            container, 
            input, 
            viewStyle,
            logoContainer,
            imageStyle
        } = styles;

        if ( this.state.loading ) {
            return (
                <View style={ container }>
                    <LoadingScreen />
                </View>
            );
        }
        return (
            <View style={ container }>
                <ImageBackground 
                    source={require('../../assets/Background.png')} 
                    style={{ width: '100%', height: '100%', flex: 1 }}
                    resizeMode={'cover'}
                >
                    <View style={ logoContainer }>
                        <Image 
                            source={require('../../assets/Mattiz-Didot-Simple-Squared-Green.png')} 
                            style={ imageStyle }
                        />
                    </View>
                    <View style={ viewStyle }>
                        <Input 
                            placeholder="Password "
                            inputContainerStyle={{ borderBottomColor: colors.darkGray, marginTop: 320}}
                            placeholderTextColor='gray'
                            secureTextEntry={true}
                            onChangeText={ value => this.setState({ password: value }) }
                            fontStyle={ this.state.password? 'italic' : 'normal' }
                            onFocus={() => this.setState({ isFocused: true })}
                            style={ input }
                        />
                    </View>
                    <View style={{ marginTop: this.state.isFocused ? 310 : 600, alignSelf: 'stretch' }}>
                        <PalmButton 
                            title={'Log In! '}
                            backgroundColor={colors.palleteLightGreen}
                            onPress={ () => this.onButtonPress()}
                        />
                    </View>
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
        backgroundColor: 'transparent',
        margin: 5,
        padding: 20
    },
    viewStyle: {
        margin: '5%', 
        height: 55, 
        borderRadius: 10, 
    },
    logoContainer: { 
        position: 'absolute', 
        top: '10%', 
        width: '95%', 
        alignSelf: 'center' 
    },
    imageStyle: { 
        width: 180, 
        height: 140, 
        alignSelf: 'center',     
    }
})

const mapDispatchtoProps = dispatch => ({
    loadPlaidInfo: () => dispatch(loadPlaidInfo()),
    setUserInReduxState: user => dispatch(setUserInReduxState(user))
});

const MapStateToProps = state => {
    const { user, token, error } = state.auth
    const loading = state.plaid
    return {
        user,
        token,
        error,
        loading
    };
}

export default connect(MapStateToProps, mapDispatchtoProps)(LoginForm);