import React from 'react';
import { LineChart } from 'react-native-svg-charts';
import { View } from 'react-native-animatable';
import * as shape from 'd3-shape';

import colors from '../../constants/colors';
class SimpleLineChart extends React.PureComponent {

    render() {
        
        const data = this.props.data.map(d => parseFloat(d)) 
        
        return (
            
                <LineChart
                    style={{ height: 200, width: '100%' }}
                    data={ data.slice(-60, -1) }
                    svg={{ stroke: colors.paletteBlue, strokeWidth: 1 }}
                    contentInset={{ top: 30, bottom: 30 }}
                    curve={ shape.curveNatural }
                    animate={true}
                    animationDuration={400}
                >
                    <View  animation='bounce' useNativeDriver>
                    {
                        this.props.children
                    }
                    </View>
                </LineChart>
            
        )
    }
}


export default SimpleLineChart