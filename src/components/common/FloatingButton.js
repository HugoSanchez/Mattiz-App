import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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
                    <Icon 
                        name={ props.iconName } 
                        size={25} 
                        color={colors.palleteLightGreen} 
                        style={styles.iconStyle} /> 
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    buttonStyle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        right: 25,
        bottom: 25,
        backgroundColor: colors.palleteDarkGreen,
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