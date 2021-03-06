import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../constants/colors';

// Props:
// @containerStyles: -Optional- Wrapping container styles.
// @title: -Required- Text to be displayed.
// @titleStyle: - Optional - Text style for the title - there is a default.
// @buttonStyle: -Optionsl - Additional button styles.
// @onPress: -Required- Function to be executed on press. 
// @linearColor: -Optional - RGBA value for second linear color. Default: Mattiz Blue.

const MattizButton = props => {
    const { container, titleStyle, buttonStyle } = styles;
    return (
        <View style={[ container, props.containerStyles ]}>
            <Button 
                title={props.title}
                titleStyle={[ titleStyle, props.titleStyle ]}
                buttonStyle={[ buttonStyle, props.buttonStyle ]}
                onPress={ props.onPress }
                ViewComponent={ LinearGradient }
                linearGradientProps={{
                    colors: ['#DDEDF7', props.linearColor || '#DDEDF7'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
            /> 
        </View>
    );
}

const styles = {
    container: {
        alignSelf: 'stretch',
        margin: 10, 
        borderRadius: 12,
        backgroundColor: '#FFFF',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 10 },
        shadowOpacity: 0.29,
        shadowRadius: 12.65,
        elevation: 22,
    },
    titleStyle: {
        color: colors.primaryBlue, 
        fontFamily: 'Raleway-Regular'
    },
    buttonStyle: {
        height: 60, 
        borderRadius: 10,
    }
}

export default MattizButton;