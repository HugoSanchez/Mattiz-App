import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity, 
} from 'react-native';
import { connect } from 'react-redux';
import GS from '../../styles'

// Props:
// @onWeekPress: - Required. Function to execute. 
// @onMonthPress: - Required. Function to execute. 
// @onQuarterPress: - Required. Function to execute. 
// @onYearPress: - Required. Function to execute. 

const TimeframeSelector = props => {

    const { container, textBox } = styles;

    return (
        <View style={ container }>
            
            <TouchableOpacity onPress={ props.onWeekPress } style={ textBox }>
                <Text style={[ 
                    GS.extraSmallLightTitle,
                    props.timeframe == 'week' ? { fontFamily: 'Raleway-SemiBold'} : null
                    ]}> 
                    Week 
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ props.onMonthPress } style={ textBox }>
                <Text style={[ 
                    GS.extraSmallLightTitle,
                    props.timeframe == 'month' ? { fontFamily: 'Raleway-SemiBold'} : null
                    ]}> 
                    Month 
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ props.onQuarterPress } style={ textBox }>
                <Text style={[ 
                    GS.extraSmallLightTitle,
                    props.timeframe == 'quarter' ? { fontFamily: 'Raleway-SemiBold'} : null
                    ]}> 
                   Quarter 
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ props.onYearPress } style={ textBox }>
                <Text style={[ 
                    GS.extraSmallLightTitle,
                    props.timeframe == 'year' ? { fontFamily: 'Raleway-SemiBold'} : null
                    ]}> 
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

const mapStateToProps = state => {
    const { timeframe } = state.timeframe;
    return { timeframe }
}

export default connect(mapStateToProps, {})(TimeframeSelector);