import React from 'react'
import {View} from 'react-native'

import colors from '../constants/colors'

const Spinner = require('react-native-spinkit')

// Props:
// @size: 75 by default.

const LoadingScreen = props => {
	return (
		<View testID="LoadingScreen" style={styles.container}>
			<Spinner
				style={{alignSelf: 'center'}}
				isVisible={true}
				size={props.size || 75}
				type="Pulse"
				color={colors.palleteDarkGreen}
			/>
			{props.children}
		</View>
	)
}

const styles = {
	container: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
}

export default LoadingScreen
