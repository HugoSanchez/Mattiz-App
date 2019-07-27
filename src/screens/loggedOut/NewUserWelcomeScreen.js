import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import PalmButton from '../../components/common/PalmButton';
import Header from '../../components/common/Header';

const NewUserWelcomeScreen = props => {
    const { navigation } = props;
    return (
        <View style={ styles.container }>
            <ImageBackground 
                source={require('../../assets/newUserGreeting.png')} 
                style={{ width:'100%', height:'100%', flex: 1 }}
                resizeMode='cover'
            >
                <Header />
                <View style={{ marginTop: 600 }}>
                    <Animatable.View 
                        animation="pulse" 
                        easing="ease-out" 
                        iterationCount="infinite"
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    >
                        <PalmButton 
                            iconName={'arrow-right'}
                            onPress={() => navigation.navigate('PlaidLink')}
                            title={'Continue'}        
                        />
                    </Animatable.View>
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
    }
});

export default NewUserWelcomeScreen;