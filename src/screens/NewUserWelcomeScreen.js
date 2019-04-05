import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import MattizButton from '../components/common/MattizButton';

const NewUserWelcomeScreen = props => {
    const { navigation } = props;
    return (
        <View style={ styles.container }>
            <ImageBackground 
                source={require('../assets/newUserGreeting.png')} 
                style={{ width:'100%', height:'100%', flex: 1 }}
                resizeMode='cover'
            >
                <View style={{ marginTop: 690 }}>
                    <MattizButton
                        title={'Link Accounts'}
                        onPress={() => navigation.navigate('PlaidLink')} 
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
    }
});

export default NewUserWelcomeScreen;