import React from 'react';
import { View } from 'react-native';

const Spinner = require('react-native-spinkit');

const LoadingScreen = props => {
    return (
        <View style={ styles.container }>
            <Spinner 
                style={{ alignSelf: 'center' }} 
                isVisible={true} 
                size={75} 
                type='Arc' 
                color='#A3D164'
            />
            {
                props.children
            }
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
};

export default LoadingScreen;