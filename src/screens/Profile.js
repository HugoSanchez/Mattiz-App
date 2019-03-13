import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

// Files import.
import { removeTokenFromMemory } from '../api/auth';
import { deleteUserFromReduxState } from '../actions'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    async onLogout() {
        // Remove token from memory.
        await removeTokenFromMemory();
        // Set initial state back in redux.
        this.props.deleteUserFromReduxState();
        // Navigate user out.
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <Button 
                    title="Logout"
                    onPress={this.onLogout.bind(this)}
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
    const { user, error } = state.auth;
    return {
        user,
        error
    };
}

export default connect(MapStateToProps, { deleteUserFromReduxState })(Profile);