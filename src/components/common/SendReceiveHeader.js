import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from '../../styles';
import colors from '../../constants/colors';

// Props:
// @ onSendPress:    - Required. Function to be executed.
// @ onReceivePress: - Required. Function to be executed.
// @ onRequestClose: - Required. Function to be executed when X is pressed to close modal.
// @ isSendSelected: - Required. Boolean.

const SendReceiveHeader = props => {

    const {
        extraSmallMediumTitle,
        extraSmallLightTitle
    } = styles;

    const { 
        container, 
        xButtonContainer,
        selectorContainer,
        xButtonStyle,
        selectedStyle,
    } = compStyles;

    const {
        isSendSelected,
        onRequestClose
    } = props;

    return (
        <View style={ container }>
            <View style={xButtonContainer}>
                <TouchableOpacity onPress={onRequestClose} style={xButtonStyle}>
                    <Icon name='x' size={25} color={colors.primaryBlue} />
                </TouchableOpacity>
            </View>
            
            <View style={ selectorContainer }>
                <View style={ styles.container }>
                    <TouchableOpacity
                        style={ isSendSelected ? selectedStyle : null} 
                        onPress={ props.onSendPress }> 
                        <Text style={ isSendSelected ? extraSmallMediumTitle : extraSmallLightTitle }> 
                            Send 
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={ styles.container }>
                    <TouchableOpacity 
                        style={ !isSendSelected ? selectedStyle : null}
                        onPress={ props.onReceivePress }>
                        <Text style={ !isSendSelected ? extraSmallMediumTitle : extraSmallLightTitle }>
                            Receive 
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const compStyles = {
    container: { 
        flex: 2, 
        alignSelf: 'stretch'
    },
    xButtonContainer: {
        flex: 0.5
    },
    xButtonStyle: { 
        width: '10%', 
        marginLeft: '4%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    selectorContainer: {
        flex: 2,
        flexDirection: 'row'
    },
    selectedStyle: { 
        borderBottomWidth: 1, 
        borderColor: colors.primaryBlue 
    }
}

export default SendReceiveHeader;