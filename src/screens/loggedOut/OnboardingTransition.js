import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';

import MattizButton from '../../components/common/MattizButton';
import PalmButton from '../../components/common/PalmButton';
import Header from '../../components/common/Header';

import gstyles from '../../styles';

const OnboardingTransition = props => {

    const { 
        container, 
        viewStyle,
        textBox,
        textStyle, 
    } = styles;
    const { navigation } = props;

    return (
        <View style={ container }>
            <ImageBackground 
                source={require('../../assets/topLogo.png')} 
                style={{ width:'100%', height:'100%', flex: 1 }}
                resizeMode='cover'
            >   
                <Header />
                <View style={{ marginTop: '8%' }}>
                    <View style={ textBox }>
                        <Text style={[ gstyles.bigLightTitle ]}>
                            Hurray!
                        </Text>
                    </View>
                    <View style={ textBox }>
                        <Text style={[ gstyles.extraSmallLightTitle, textStyle ]}>
                            You have succesfully linked your bank account. 
                            Now, continue linking more accounts, or 
                            proceed to the next stage.
                        </Text>
                    </View>
                </View>
                <Image 
                    source={require('../../assets/marginalia.png')} 
                    style={{ width: 300, height: 300, alignSelf: 'center' }}
                />
                <View style={ viewStyle }>
                <PalmButton
                    title={'Continue'}
                    iconName={'arrow-right'}
                    onPress={() => navigation.navigate('GenerateWallet')} 
                />

                <MattizButton
                    title={'Link more Accounts'}
                    linearColor={'#040026'}
                    onPress={() => navigation.navigate('PlaidLink')} 
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
    textBox: { 
        alignItems: 'center', 
        alignSelf: 'stretch'  
    },
    textStyle: { 
        margin: '7%', 
        textAlign: 'justify', 
        alignContent: 'stretch', 
        color: '#464646' 
    },
    viewStyle: {
        marginTop: 20,
        marginBottom: 40,
    },
});

export default OnboardingTransition;