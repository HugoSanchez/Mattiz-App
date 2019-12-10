import React, {Component} from 'react'
import {View, ImageBackground, Image, StyleSheet} from 'react-native'
import {Input} from 'react-native-elements'

// Required 'Shim' for ethers.js to work in React Native.
import 'ethers/dist/shims.js'
import {ethers} from 'ethers'

// Custom Components.
import PalmButton from '../../components/common/PalmButton'
import LoadingScreen from '../../components/LoadingScreen'

// Connect.
import {connect} from 'react-redux'

// Redux Actions and Auth Functions.
import {authCreateUser, setTokenInMemory} from '../../api/auth'
import {setUserInReduxState} from '../../actions'
import colors from '../../constants/colors'

class SignUpForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: null,
			password: null,
			confirmPassword: null,
			formStatus: false,
			isFocused: false,
			loading: false,
		}
	}

	async onButtonPress() {
		// Deconstruct state.
		const {username, password, confirmPassword} = this.state
		// Check if passwords are correct.
		if (password == confirmPassword) {
			// Set loading == true.
			this.setState({loading: true})
			// If so, call the '/register' endpoint which returns token.
			authCreateUser(username, password).then(async userInfo => {
				if (userInfo.auth) {
					console.log('User: ', userInfo)
					// If token, save it in memory
					setTokenInMemory('token', userInfo.token)
					// And set user in redux state.
					this.props.setUserInReduxState(userInfo.user)
					// Create new Ethereum Wallet.
					let wallet = new ethers.Wallet(userInfo.ethKey)
					// Encrypt and store wallet.
					let encrypted = await wallet.encrypt(userInfo.user.password)
					// Store encrypted wallet in Memory - need to change this to keystore.
					await setTokenInMemory('wallet', encrypted)
					// Navigate user to onboarding set up.
					this.props.navigation.navigate('Welcome')
				}
			})
		}
	}

	render() {
		const {
			container,
			logoContainer,
			input,
			viewStyle,
			textInput,
			placeholder,
			imageStyle,
		} = styles

		if (this.state.loading) {
			return (
				<View style={container} testID="LoadingScreen">
					<LoadingScreen />
				</View>
			)
		}

		if (this.state.formStatus == false) {
			return (
				<View style={container}>
					<ImageBackground
						source={require('../../assets/Background.png')}
						style={{width: '100%', height: '100%', flex: 1}}
						resizeMode={'cover'}>
						<View style={logoContainer}>
							<Image
								source={require('../../assets/Mattiz-Didot-Simple-Squared-Green.png')}
								style={imageStyle}
							/>
						</View>

						<View
							style={{
								position: 'absolute',
								bottom: '2%',
								width: '95%',
								alignSelf: 'center',
							}}>
							<PalmButton
								backgroundColor={colors.palleteLightGreen}
								onPress={() =>
									this.setState({formStatus: 'username'})
								}
								title={'Sign Up'}
							/>
						</View>
					</ImageBackground>
				</View>
			)
		}

		//  SET USERNAME   //
		if (this.state.formStatus === 'username') {
			return (
				<View style={container} testID="SignUpFormNameInput">
					<ImageBackground
						source={require('../../assets/Background.png')}
						style={{width: '100%', height: '100%', flex: 1}}
						resizeMode={'cover'}>
						<View style={logoContainer}>
							<Image
								source={require('../../assets/Mattiz-Didot-Simple-Squared-Green.png')}
								style={imageStyle}
							/>
						</View>
						<View style={viewStyle}>
							<Input
								placeholder="What's your name?"
								placeholderTextColor={colors.darkGray}
								value={this.state.username}
								onChangeText={value =>
									this.setState({username: value})
								}
								fontStyle={'italic'}
								onFocus={() => this.setState({isFocused: true})}
								inputStyle={
									this.state.username
										? textInput
										: placeholder
								}
								style={input}
							/>
						</View>
						<View
							style={{
								alignSelf: 'center',
								position: 'absolute',
								top: this.state.isFocused ? '45%' : '90%',
							}}>
							<PalmButton
								iconName={'arrow-right'}
								onPress={() =>
									this.setState({formStatus: 'password'})
								}
								title={'Continue'}
							/>
						</View>
					</ImageBackground>
				</View>
			)
		}

		//  SET PASSWORD   //
		if (this.state.formStatus === 'password') {
			return (
				<View style={container}>
					<ImageBackground
						source={require('../../assets/Background.png')}
						style={{width: '100%', height: '100%', flex: 1}}
						resizeMode={'cover'}>
						<View style={logoContainer}>
							<Image
								source={require('../../assets/Mattiz-Didot-Simple-Squared-Green.png')}
								style={imageStyle}
							/>
						</View>
						<View style={viewStyle}>
							<Input
								placeholder="Choose your password"
								placeholderTextColor="#464646"
								value={this.state.password}
								secureTextEntry={true}
								onChangeText={value =>
									this.setState({password: value})
								}
								fontStyle={'italic'}
								inputStyle={
									this.state.password
										? textInput
										: placeholder
								}
								onFocus={() => this.setState({isFocused: true})}
								style={input}
							/>
						</View>
						<View
							style={{
								alignSelf: 'center',
								position: 'absolute',
								top: this.state.isFocused ? '45%' : '90%',
							}}>
							<PalmButton
								iconName={'arrow-right'}
								onPress={() =>
									this.setState({formStatus: 'confirm'})
								}
								title={'Continue'}
							/>
						</View>
					</ImageBackground>
				</View>
			)
		}

		//   CONFIRM PASSWORD   //
		if (this.state.formStatus === 'confirm') {
			return (
				<View style={container}>
					<ImageBackground
						source={require('../../assets/Background.png')}
						style={{width: '100%', height: '100%', flex: 1}}
						resizeMode={'cover'}>
						<View style={logoContainer}>
							<Image
								source={require('../../assets/Mattiz-Didot-Simple-Squared-Green.png')}
								style={imageStyle}
							/>
						</View>
						<View style={viewStyle}>
							<Input
								placeholder="Confirm password"
								placeholderTextColor="#464646"
								value={this.state.confirmPassword}
								secureTextEntry={true}
								onChangeText={value =>
									this.setState({confirmPassword: value})
								}
								fontStyle={'italic'}
								inputStyle={
									this.state.confirm ? textInput : placeholder
								}
								onFocus={() => this.setState({isFocused: true})}
								style={input}
							/>
						</View>
						<View
							style={{
								alignSelf: 'center',
								position: 'absolute',
								top: this.state.isFocused ? '45%' : '90%',
							}}>
							<PalmButton
								iconName={'check-circle'}
								onPress={() => this.onButtonPress()}
								title={'Sign up!'}
							/>
						</View>
					</ImageBackground>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#FFF',
	},
	logoContainer: {
		position: 'absolute',
		top: '10%',
		width: '95%',
		alignSelf: 'center',
	},
	viewStyle: {
		position: 'absolute',
		top: '40%',
		flexDirection: 'row',
		marginLeft: '10%',
		marginRight: '10%',
		height: '5%',
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
	},
	placeholder: {
		fontFamily: 'Rajdhani-Light',
		fontSize: 18,
	},
	textInput: {
		fontFamily: 'Rajdhani-Regular',
		fontSize: 20,
		color: colors.primaryBlue,
	},
	imageStyle: {
		width: 180,
		height: 140,
		alignSelf: 'center',
	},
})

const mapDispatchtoProps = dispatch => ({
	setUserInReduxState: user => dispatch(setUserInReduxState(user)),
})

const mapStateToProps = state => {
	const {user, token, error} = state.auth
	return {
		user,
		token,
		error,
	}
}

export default connect(
	mapStateToProps,
	mapDispatchtoProps,
)(SignUpForm)
