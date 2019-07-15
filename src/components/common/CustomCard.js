import React from 'react';
import { View } from 'react-native';

// Props:
// @elevated: if additional prop styles if true, else null.

const CustomCard = props => {
    return (
        <View style={[ 
                styles.container, 
                props.style, 
                props.elevated ? {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    elevation: 7 } 
                    : 
                    null 
                ]}
            >
            {
                props.children
            }
        </View>
    );
}

const styles = {
    container: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#FDFFFE'
    }
};

export default CustomCard;