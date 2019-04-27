import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape'

class SimpleLineChart extends React.PureComponent {

    render() {

        const data = this.props.data.map(d => parseFloat(d))
        
        return (
            <LineChart
                style={{ height: 200, width: '100%' }}
                data={ data.slice(-90, -1) }
                svg={{ stroke: '#A3D164' }}
                contentInset={{ top: 20, bottom: 20 }}
                curve={ shape.curveNatural }
            >
                <View style={{ alignSelf: 'stretch', alignItems: 'center'}}>
                    <Text style={{ fontFamily: 'Raleway-Light', fontSize: 14, fontSize: 32, marginTop: 15, marginBottom: 5 }}>
                        $ { this.props.price },84
                    </Text> 
                </View>
            </LineChart>
        )
    }
}


export default SimpleLineChart