import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> You are now looged in! </Text>
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