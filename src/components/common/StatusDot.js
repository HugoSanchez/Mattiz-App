import React from 'react';
import { View } from 'react-native';

// Props:
// @size: size.
// @positive: if true: color green, if not: color red.

const StatusDot = props => {  
    return (
        <View style={{ 
            width: props.size,
            height: props.size, 
            borderRadius: props.size / 2,
            backgroundColor: props.positive ? '#C4E19C' : '#C88383',
            }}
        />   
    );
}

export default StatusDot;