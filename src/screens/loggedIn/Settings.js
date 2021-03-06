import React, {Component} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Files import.
import {removeTokenFromMemory} from '../../api/auth'
import {deleteUserFromReduxState} from '../../actions'

import colors from '../../constants/colors'
class Settings extends Component {
	constructor(props) {
		super(props)
		this.onLogout = this.onLogout.bind(this)
	}

	static navigationOptions = {
		title: 'Settings',
		drawerIcon: ({focused}) => (
			<Icon
				name={'options'}
				size={20}
				color={focused ? colors.palleteDarkGreen : colors.paletteGray}
			/>
		),
	}

	async onLogout() {
		// Set initial state back in redux.
		this.props.deleteUserFromReduxState()
		// Remove token from memory.
		removeTokenFromMemory('token')
		// Navigate user out.
		this.props.navigation.navigate('Login')
	}

	render() {
		return (
			<View style={styles.container}>
				<Button title="Logout" onPress={this.onLogout.bind(this)} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
})

const MapStateToProps = state => {
	const {user, error} = state.auth
	return {
		user,
		error,
	}
}

export default connect(
	MapStateToProps,
	{deleteUserFromReduxState},
)(Settings)
