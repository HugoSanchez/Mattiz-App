import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from '../../styles';
import colors from '../../constants/colors';

// Props:
// @ onSendPress:    - Required. Function to be executed.
// @ onReceivePress: - Required. Function to be executed.
// @ isSendSelected: - Required. Boolean.

const SendReceiveHeader = props => {

    const {
        extraSmallMediumTitle,
        extraSmallLightTitle
    } = styles;

    const { 
        container, 
        selectedStyle,
    } = compStyles;

    const {
        isSendSelected
    } = props;

    return (
        <View style={ container }>
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
    );
}

const compStyles = {
    container: { 
        flex: 1, 
        flexDirection: 'row' 
    },
    selectedStyle: { 
        borderBottomWidth: 1, 
        borderColor: colors.primaryBlue 
    }
}

export default SendReceiveHeader;