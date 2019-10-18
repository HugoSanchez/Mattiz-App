import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import colors from '../../constants/colors'

// Props:

const Header = props => {
	return (
		<View
			style={[
				styles.container,
				props.enlargedElement ? {height: '15%'} : null,
				props.elevated
					? {
							shadowColor: '#000',
							shadowOffset: {width: 0, height: 5},
							shadowOpacity: 0.29,
							shadowRadius: 4.65,
							elevation: 2,
					  }
					: null,
			]}>
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity
					onPress={props.onPressBack}
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '1%',
					}}
				>
					{
						props.goBack ?
						<Icon
							name={'arrow-left'}
							size={15}
							color={colors.palleteDarkGreen}
							style={{
								alignSelf: 'flex-start',
								marginTop: '40%',
								marginLeft: '20%',
							}}
						/>
						: null}
				</TouchableOpacity>
				<View
					style={{
						flex: 2,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '7%',
					}}>
					<Text
						style={{
							fontFamily: 'Didot-Bold',
							fontSize: 18,
							color: colors.palleteDarkGreen,
						}}>
						MATTIZ!
					</Text>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '1%',
					}}>
					<Icon
						name={'bell'}
						size={20}
						color={colors.palleteDarkGreen}
						style={{
							alignSelf: 'flex-end',
							marginTop: '40%',
							marginRight: '20%',
						}}
					/>
				</View>
			</View>
			{props.enlargedElement ? props.enlargedElement : null}
		</View>
	)
}

const styles = {
	container: {
		width: '100%',
		height: '12%',
		paddingTop: '3%',
		backgroundColor: '#fff',
	},
}

export default Header
