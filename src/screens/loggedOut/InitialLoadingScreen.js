import React, {Component} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import {
	requestSecConn,
	establishSecConn,
	getTokenFromMemory,
	identifyUser,
} from '../../api'

// Auth Actions & Functions
import {setUserInReduxState, setTokeninReduxState} from '../../actions'

class InitialLoadingScreen extends Component {
	async componentDidMount() {
		const {data} = await requestSecConn()
		await establishSecConn(data)

		this.initiateFunction.bind(this)()
	}

	async initiateFunction() {
		// Get token from memory if there is one.
		let token = await getTokenFromMemory('token')
		// Check if there is token
		!token
			? // If there is no token, go to signUpForm.
			  this.props.navigation.navigate('Onboarding')
			: // If there is, call '/identify' endpoint.
			  identifyUser(token).then(res => {
					// Set user in redux state.
					this.props.setUserInReduxState(res.data.user)
					// Set the token in redux state.
					this.props.setTokeninReduxState(token)
					// Go to Login page.
					this.props.navigation.navigate('Login')
			  })
	}

	render() {
		return (
			<View style={styles.container}>
				<Animatable.View
					animation="pulse"
					easing="ease-out"
					iterationCount="infinite"
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Image
						source={require('../../assets/Mattiz-Didot-Simple-Squared-Green.png')}
						style={{width: 240, height: 110, marginBottom: '10%'}}
					/>
				</Animatable.View>
			</View>
		)
	}
}

const MapStateToProps = state => {
	const {user, token, error} = state.auth
	return {
		user,
		token,
		error,
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewStyle: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default connect(
	MapStateToProps,
	{setUserInReduxState, setTokeninReduxState},
)(InitialLoadingScreen)
