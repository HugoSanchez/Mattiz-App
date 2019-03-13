import React, { Component } from 'react';
import { connect } from 'react-redux';

/* System Files */ 
import { getTokenFromMemory, identifyUser } from '../api/auth';
import { setUserInReduxState, setToken } from '../actions';

/* Components */
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import InitialLoadingScreen from '../components/InitialLoadingScreen';


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
            // Then set user in redux state.
            console.log('Res: ', res.data)
            setToken()
            setUserInReduxState(res.data)
            // Go to Login page.
            this.setState({ loading: false, isUserSignedUp: true })
        })
    }

    render() {
        /* Conditional rendering */
        if ( this.state.loading === true ) {
            return <InitialLoadingScreen />;
        }

        if ( this.state.loading === false && this.state.isUserSignedUp === false ) {
            return <SignUpForm navigation={this.props.navigation}/>;
        }

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

export default connect(MapStateToProps, { setUserInReduxState, setToken })(OutScreen);