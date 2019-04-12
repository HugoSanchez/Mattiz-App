import React from 'react'
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
 
export default class StackedAreaExample extends React.PureComponent {
 
    render() {
 
        const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]
 
        const colors = [ '#A3D164', '#B3D980', '#C4E19C', '#DDEEC6' ]
        const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]
        const svgs = [
                    { onPress: () => console.log('apples') },
                    { onPress: () => console.log('bananas') },
                    { onPress: () => console.log('cherries') },
                    { onPress: () => console.log('dates') },
                ]
 
        return (
            <StackedAreaChart
                style={ { height: 200, width: '100%', paddingVertical: 16 } }
                data={ data }
                keys={ keys }
                colors={ colors }
                curve={ shape.curveNatural }
                showGrid={ false }
                svgs={ svgs }
            />
        )
    }
}