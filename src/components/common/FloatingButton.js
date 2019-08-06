import React from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import colors from '../../constants/colors'

// Props:
// @ onPress:  - Required. Function to execute.
// @ iconName: - Required. Icon to render. 

const FloatingButton = props => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={ props.onPress }
                style={styles.buttonStyle}>
                    <ImageBackground 
                        source={require('../../assets/FloatingButton-Leaf.png')} 
                        imageStyle={{borderRadius: 25}}
                        style={{width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon 
                                name={ props.iconName } 
                                size={27} 
                                color={'#E7F7DD'} 
                                style={styles.iconStyle} /> 
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    buttonStyle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E7F7DD',
        borderWidth: 0.8,
        width: 50,
        height: 50,
        borderRadius: 25,
        right: 25,
        bottom: 15,
        backgroundColor: colors.primaryBlue,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.29,
        shadowRadius: 2.65,
        elevation: 2,
      },
      iconStyle: {
        marginTop: 3,
        marginRight: 3
    }
};

export default FloatingButton;