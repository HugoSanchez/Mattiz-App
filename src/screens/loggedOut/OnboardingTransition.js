import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

import MattizButton from '../../components/common/MattizButton';

const OnboardingTransition = props => {

    const { container, viewStyle } = styles;
    const { navigation } = props;

    return (
        <View style={ container }>
            <ImageBackground 
                source={require('../../assets/topLogo.png')} 
                style={{ width:'100%', height:'100%', flex: 1 }}
                resizeMode='cover'
            >
                <View style={ viewStyle }>
                <MattizButton
                    title={'Link more Accounts'}
                    onPress={() => navigation.navigate('PlaidLink')} 
                />

                <MattizButton
                    title={'Get Private Keys'}
                    onPress={() => navigation.navigate('GenerateWallet')} 
                />
                </View> 
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewStyle: {
        marginTop: 600,
        marginBottom: 40,
    },
});

export default OnboardingTransition;
