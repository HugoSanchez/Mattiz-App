import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

import PalmButton from '../../components/common/PalmButton';
import colors from '../../constants/colors';

const NewUserWelcomeScreen = props => {
    const { navigation } = props;
    return (
        <View style={ styles.container }>
            <ImageBackground 
                source={require('../../assets/newUserGreeting.png')} 
                style={{ width:'100%', height:'100%', flex: 1 }}
                resizeMode='cover'
            >
                <View style={{ position: 'absolute', top: 0, height: '15%', width: '100%', backgroundColor: '#FFF'}}>
                    {/* This is just to cover old logo */}
                </View>

                <View style={{alignSelf: 'center', position: 'absolute', top: '85%', width: '95%'}}>
                    <PalmButton 
                        backgroundColor={colors.palleteLightGreen}
                        iconName={'arrow-right'}
                        onPress={() => navigation.navigate('PlaidLink')}
                        title={'Continue'}        
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