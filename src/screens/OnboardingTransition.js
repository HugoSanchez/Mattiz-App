import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';



class OnboardingTransition extends Component {

    render() {
        const { 
            container,
            titleStyle,
            buttonStyle
        } = styles;

        return (
            <View style={ container }>
                <ImageBackground 
                    source={require('../assets/topLogo.png')} 
                    style={{ width:'100%', height:'100%', flex: 1 }}
                    resizeMode='cover'
                >
                    <Button 
                        title='Link more Accounts'
                        titleStyle={ titleStyle }
                        buttonStyle={ buttonStyle }
                        onPress={ () => this.props.navigation.navigate('PlaidLink', {reload: true}) }
                        ViewComponent={ LinearGradient }
                        linearGradientProps={{
                            colors: ['rgba(163, 209, 100, 1)', 'rgba(4, 0, 38, 1)'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                    />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        color: 'white', 
        fontFamily: 'Raleway'
    },
    buttonStyle: {
        margin: 20, 
        marginTop: 690, 
        height: 60, 
        borderRadius: 10,
        backgroundColor: 'transparent'
    }
});

export default OnboardingTransition;
