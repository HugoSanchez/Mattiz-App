import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import StackedAreaExample from '../components/common/LineChart';


export default class Products extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StackedAreaExample />
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
    }
})