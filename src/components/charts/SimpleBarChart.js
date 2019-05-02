import React from 'react'
import { BarChart } from 'react-native-svg-charts'

class SimpleBarChart extends React.PureComponent {

    render() {

        const fill = '#CCE5AA'
        const data = this.props.data.map(d => parseFloat(d))

        return (
            <BarChart
                style={{ height: 200, width: '100%' }}
                data={ data.slice(-30, -1) }
                svg={{ fill }}
                contentInset={{ top: 20, bottom: 20 }}
                animate={true}
                animationDuration={400}
            >
                {
                    this.props.children
                }
            </BarChart>
        )
    }
}

export default SimpleBarChart;