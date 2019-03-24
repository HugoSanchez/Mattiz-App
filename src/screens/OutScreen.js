import React, { Component } from 'react';
import { connect } from 'react-redux';

// System Files // 
import { getTokenFromMemory, identifyUser } from '../api/auth';
import { setUserInReduxState, setTokeninReduxState } from '../actions';

// Components //
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import InitialLoadingScreen from './InitialLoadingScreen';


class OutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserSignedUp: false, 
            loading: true
        }
    }

    async componentWillMount() {
        // Get token from memory if there is one.
        let token = await getTokenFromMemory()
        // Check if there is token
        !token ?
        // If there is no token, go to signUpForm.
        this.setState({ loading: false })
        :
        // If there is, call '/identify' endpoint.
        identifyUser(token).then(res => {
            // Set user in redux state.
            this.props.setUserInReduxState(res.data)
            // Set the token in redux state. 
            this.props.setTokeninReduxState(token)
            // Go to Login page.
            this.setState({ loading: false, isUserSignedUp: true })
        })
    }

    render() {
        // First render loading screen
        if ( this.state.loading === true ) {
            return <InitialLoadingScreen />;
        }

        // Then if user is not signed up, render SignUpForm
        if ( this.state.loading === false && this.state.isUserSignedUp === false ) {
            return <SignUpForm navigation={this.props.navigation}/>;
        }

        // Else render LoginForm.
        return <LoginForm navigation={this.props.navigation}/>;
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

export default connect(MapStateToProps, { setUserInReduxState, setTokeninReduxState })(OutScreen);