import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setToken } from '../actions';
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

    componentWillMount() {
        this.setState({ loading: false });
    }

    async onLogin() {
        this.props.setToken();
        // this.props.navigation.navigate('Dashboard');
    }

    render() {
        /** Conditional rendering */
        if ( this.state.loading === true ) {
            return <InitialLoadingScreen />;
        }

        if ( this.state.loading === false && this.state.isUserSignedUp === false ) {
            return <SignUpForm />;
        }

        return <LoginForm />;
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

export default connect(MapStateToProps, { setToken })(OutScreen);