import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

// Props:


const TimeframeSelector = props => {
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
                    colors: ['rgba(163, 209, 100, 1)', props.linearColor || 'rgba(4, 0, 38, 1)'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
            /> 
        </View>
    );
}

const styles = {
    container: {
        margin: 10, 
        borderRadius: 12,
        backgroundColor: '#FDFFFE',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 10 },
        shadowOpacity: 0.29,
        shadowRadius: 12.65,
        elevation: 22,
    },
    titleStyle: {
        color: 'white', 
        fontFamily: 'Raleway-Regular'
    },
    buttonStyle: {
        height: 60, 
        borderRadius: 10,
    }
}

export default TimeframeSelector;