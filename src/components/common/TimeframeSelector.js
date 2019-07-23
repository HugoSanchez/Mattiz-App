import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity, 
} from 'react-native';

//General Styles & Colors
import GS from '../../styles'

// Props:
// @onPress: - Required. Function to execute. 
// @textStyle: -Required. Changes fontFamily when timeframe selected. 
/**
 * 
 *  this.state.timeframe == 'week' ?
    { fontFamily: 'Raleway-SemiBold'}
    :
    null
 */

const TimeframeSelector = props => {

    const { container, textBox } = styles;

    return (
        <View style={ container }>
            
            <TouchableOpacity onPress={ props.onPress } style={ textBox }>
                <Text style={[ GS.extraSmallLightTitle, props.textStyle ]}> 
                    Week 
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ props.onPress } style={ textBox }>
                <Text style={[ GS.extraSmallLightTitle, props.textStyle ]}> 
                    Month 
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ props.onPress } style={ textBox }>
                <Text style={[ GS.extraSmallLightTitle, props.textStyle ]}> 
                   Quarter 
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ props.onPress } style={ textBox }>
                <Text style={[ GS.extraSmallLightTitle, props.textStyle ]}> 

                    Year 
                </Text>
            </TouchableOpacity>
        </View> 
    );
}

const styles = {
    container: { 
        flex: 1, 
        flexDirection: 'row', 
        alignSelf: 'stretch', 
        alignItems: 'center', 
        marginRight: '8%', 
        marginLeft: '8%',
        marginTop: '15%' 
    },
    textBox: { 
        flex: 1, 
        alignSelf: 'stretch', 
        alignItems: 'center' 
    }
}

export default TimeframeSelector;