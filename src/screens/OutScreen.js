import React, { Component } from 'react';
import { connect } from 'react-redux';

/* System Files */ 
import { getUserFromMemory } from '../api/auth';
import { setUser } from '../actions';

/* Components */
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import InitialLoadingScreen from '../components/InitialLoadingScreen';

class OutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserSignedUp: false, 
            loading: false
        }
    }

    componentWillMount() {
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

export default connect(MapStateToProps, { setUser })(OutScreen);