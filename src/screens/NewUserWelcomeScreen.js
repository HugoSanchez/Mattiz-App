import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const NewUserWelcomeScreen = (props) => {
    const { container, titleStyle, buttonStyle } = styles
    return (
        <View style={ container }>
            <ImageBackground 
                source={require('../assets/newUserGreeting.png')} 
                style={{ width:'100%', height:'100%', flex: 1 }}
                resizeMode='cover'
            >
                <View>
                    <Button 
                        title='Link Accounts'
                        titleStyle={ titleStyle }
                        buttonStyle={ buttonStyle }
                        onPress={ () => props.navigation.navigate('PlaidLink') }
                        ViewComponent={ LinearGradient }
                        linearGradientProps={{
                            colors: ['rgba(4, 0, 38, 1)', 'rgba(163, 209, 100, 1)'],
                            start: { x: 0.3, y: 0.5 },
                            end: { x:1, y: 0.5 },
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

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
        margin: 12, 
        marginTop: 690, 
        height: 60, 
        backgroundColor: 'transparent'
    }

});

export default NewUserWelcomeScreen;