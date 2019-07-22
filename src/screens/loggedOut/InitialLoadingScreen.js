import React, { Component } from 'react';
import { View, ImageBackground, Image, StyleSheet, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
 
// Auth Actions & Functions
import { getTokenFromMemory, identifyUser } from '../../api/auth';
import { setUserInReduxState, setTokeninReduxState } from '../../actions';

class InitialLoadingScreen extends Component {

    async componentDidMount() {
         // This is just to test the interaction 
         setTimeout(this.initiateFunction.bind(this), 4000)
    }

    async initiateFunction() {
        // Get token from memory if there is one.
        let token = await getTokenFromMemory('token')
        // Check if there is token
        !token ?
        // If there is no token, go to signUpForm.
        this.props.navigation.navigate('Onboarding')
        :
        // If there is, call '/identify' endpoint.
        identifyUser(token).then(res => {
           // Set user in redux state.
           this.props.setUserInReduxState(res.data)
           // Set the token in redux state. 
           this.props.setTokeninReduxState(token)
           // Go to Login page.
           this.props.navigation.navigate('Login')
       });
    }

    render() {
        return (
            <View style={ styles.container }>
                <ImageBackground 
                    source={require('../../assets/LoginForm.png')} 
                    style={{ width:'100%', height:'100%', flex: 1 }}
                    resizeMode='cover'
                >
                    <Animatable.View 
                        animation="pulse" 
                        easing="ease-out" 
                        iterationCount="infinite"
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Image 
                            source={require('../../assets/doubleLeaf.png')} 
                            style={{ width: 120, height: 60, marginBottom: '10%' }}
                        />
                    </Animatable.View>
                </ImageBackground>
            </View>
        )
    }
}

const MapStateToProps = state => {
    const { user, token, error } = state.auth;
    return {
        user,
        token,
        error
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewStyle: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default connect(MapStateToProps, { setUserInReduxState, setTokeninReduxState })(InitialLoadingScreen);