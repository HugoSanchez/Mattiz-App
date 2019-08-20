import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import colors from '../../constants/colors';

// Props:
// @backgroundColor: -Optional- Wrapping container color.
// @iconName:        -Required- Icon to dislplay, if any.
// @onPress:         -Required- Function to be executed on press. 
// @title:           -Required- Text to be displayed. 

const PalmButton = props => {
    const { container, titleStyle } = styles;
    return (
        <TouchableOpacity
            onPress={ props.onPress } 
            style={[ container, props.backgroundColor ? { backgroundColor: props.backgroundColor} : null ]}>
            <Text 
                style={[ titleStyle, props.titleStyle ]}> 
                {
                    props.title
                } 
            </Text>
            {
                props.iconName ?
                <Icon 
                    name={ props.iconName } 
                    size={ 27 } 
                    color={ colors.paletteDarkBlue }
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
        height: 55,
        margin: 10, 
        borderRadius: 5,
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
        fontFamily: 'Rajdhani-Regular', 
        fontSize: 22, 
        color: colors.palleteDarkGreen
    }
}

export default PalmButton;