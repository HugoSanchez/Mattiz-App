import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Files import.
import { logOut } from '../api/auth';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    async onLogout() {
        await logOut();
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <Button 
                    title="Logout"
                    onPress={this.onLogout}
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