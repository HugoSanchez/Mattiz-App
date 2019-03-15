import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.balanceBoxContainer}>
                    <Text> You are now looged in! </Text>
                </View>

                <View style={styles.boxContainer}>
                    <View style={styles.splitBox}>

                    </View>

                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    balanceBoxContainer: {
        flex: 4,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderRadius: 2,
        borderColor: '#E5F2D4',
    },
    boxContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderRadius: 2,
        borderColor: '#E5F2D4',
    }
})