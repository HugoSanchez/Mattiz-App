import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';

export default class InitialLoadingScreen extends Component {

    render() {
        return (
            <View style={ styles.container }>
                <Spinner type={ ArcAlt }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
})
