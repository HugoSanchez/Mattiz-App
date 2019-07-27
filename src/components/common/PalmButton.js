import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import colors from '../../constants/colors';

// Props:
// @containerStyles: -Optional- Wrapping container styles.
// @iconName:        -Required- Icon to dislplay, if any.
// @onPress:         -Required- Function to be executed on press. 
// @title:           -Required- Text to be displayed. 

const PalmButton = props => {
    const { container, titleStyle } = styles;
    return (
        <TouchableOpacity
            onPress={ props.onPress } 
            style={[ container, props.containerStyles ]}>
            <Text 
                style={ titleStyle }> 
                {
                    props.title
                } 
            </Text>
            {
                props.iconName ?
                <Icon 
                    name={ props.iconName } 
                    size={ 27 } 
                    color={ colors.primaryBlue }
                    style={{ marginLeft: 5 }} 
                />
                :
                null 
            }
        </TouchableOpacity>
    );
}

const styles = {
    container: {
        height: 60,
        margin: 10, 
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 12,
    },
    titleStyle: { 
        fontFamily: 'Raleway-Light', 
        fontSize: 22, 
        color: colors.primaryBlue 
    }
}

export default PalmButton;