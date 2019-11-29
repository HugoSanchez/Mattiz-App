import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import PalmButton from '../../components/common/PalmButton'

import gstyles from '../../styles'
import colors from '../../constants/colors'

const OnboardingTransition = props => {
	const {container, viewStyle, textBox, textStyle} = styles
	const {navigation} = props

	return (
		<View style={container}>
			<View
				style={{
					alignItems: 'center',
					alignSelf: 'stretch',
					marginTop: '15%',
				}}>
				<Text style={[gstyles.bigLightTitle]}>Hurray!</Text>
				<View style={textBox}>
					<Text style={[gstyles.extraSmallLightTitle, textStyle]}>
						You have succesfully linked your bank account. Now,
						continue linking more accounts, or proceed to the next
						stage.
					</Text>
				</View>
			</View>

			<View style={viewStyle}>
				<PalmButton
					title={'Continue'}
					iconName={'arrow-right'}
					onPress={() => navigation.navigate('Dashboard')}
				/>

				<PalmButton
					backgroundColor={colors.palleteLightGreen}
					title={'Link more Accounts'}
					onPress={() => navigation.navigate('PlaidLink')}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	textBox: {
		alignItems: 'center',
		alignSelf: 'stretch',
		marginTop: '45%',
	},
	textStyle: {
		margin: '7%',
		textAlign: 'justify',
		alignContent: 'stretch',
		color: '#464646',
	},
	viewStyle: {
		alignSelf: 'stretch',
		marginTop: '65%',
	},
})

export default OnboardingTransition
