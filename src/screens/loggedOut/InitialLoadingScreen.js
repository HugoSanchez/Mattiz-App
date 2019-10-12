import React, { Component } from 'react';
import { View, Image, StyleSheet, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import colors from '../../constants/colors';
import { requestSecConn, establishSecConn } from '../../api/auth'
 
// Auth Actions & Functions
import { getTokenFromMemory, identifyUser } from '../../api/auth';
import { setUserInReduxState, setTokeninReduxState } from '../../actions';

class InitialLoadingScreen extends Component {

    async componentDidMount() {
         // This is just to test the interaction 
         setTimeout(this.initiateFunction.bind(this), 4000)

        const { data } = await requestSecConn()
        console.log("Requested SC: ", data)
        establishSecConn(data)
        .then(resp => {
            console.log("resp: ", resp)
        }, (err) => {
            console.log("REJECTED: ", err)
        })
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
                    <Animatable.View 
                        animation="pulse" 
                        easing="ease-out" 
                        iterationCount="infinite"
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Image 
                            source={require('../../assets/Mattiz-Didot-Simple-Squared-Green.png')} 
                            style={{ width: 240, height: 110, marginBottom: '10%' }}
                        />
                    </Animatable.View>
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
        backgroundColor: '#FFF',
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