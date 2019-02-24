import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

// Files import.
import { logIn } from '../api/auth';
import { setToken } from '../actions';

class OutScreen extends Component {
    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    async onLogin() {
        this.props.setToken();
        // this.props.navigation.navigate('Dashboard');
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    buttonStyle={{ margin: 10, borderRadius: 30 }}
                    backgroundColor='#000'
                    title='Login'
                    onPress={ this.onLogin }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
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

export default connect(MapStateToProps, { setToken })(OutScreen);