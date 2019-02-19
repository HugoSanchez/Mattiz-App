import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { logIn } from '../api/auth';

export default class OutScreen extends Component {
    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    async onLogin() {
        await logIn();
        this.props.navigation.navigate('Dashboard');
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='Login'
                    onPress={this.onLogin}
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