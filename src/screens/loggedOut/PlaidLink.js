import React, {Component} from 'react'
import {WebView} from 'react-native-webview'

import {
	getAccessToken,
	setTokenInMemory,
	getTokenFromMemory,
} from '../../api/auth'

const WEBVIEW_REF = 'webview'
const publicKey = 'cbc3786c0826ebad66f33cecc745dc'
const env = 'sandbox'
const product = 'auth,transactions'
const clientName = 'Mattiz.'
const selectAccount = false
const countryCodes = ['GB,ES,FR']

const uri = `https://cdn.plaid.com/link/v2/stable/link.html?key=${publicKey}&countryCodes=${countryCodes}&apiVersion=v2&env=${env}&product=${product}&clientName=${clientName}&isWebView=true&isMobile=true&selectAccount=${selectAccount}`
// const uri = 'http://localhost:8000/'
class PlaidLink extends Component {
	onMessage = e => {
		console.log('Message!')
		const data = JSON.parse(e.nativeEvent.data)
		const key = data.action
			.substr(data.action.lastIndexOf(':') + 1)
			.toUpperCase()
		console.log('Key: ', key)

		if (key === 'CONNECTED') {
			console.log('1')
			// Call API method to get access token.
			getAccessToken(data.metadata.public_token)
				// Save token in memory.
				.then(async res => {
					console.log('2 Res:', res)
					// First check if there already exists a 'plaid-token' item in memory.
					await getTokenFromMemory('plaid-tokens').then(
						async tokens => {
							console.log('2 tokens: ', tokens)
							// If so,
							if (tokens) {
								// Parse it to get the token array,
								const tokenObject = JSON.parse(tokens)
								// Push the new token
								tokenObject.tokenArray.push(
									res.data.access_token,
								)
								// And save again.
								await setTokenInMemory(
									'plaid-tokens',
									JSON.stringify(tokenObject),
								)
								// If not,
							} else {
								console.log('3')
								// Create the token object and array
								const tokenObject = {tokenArray: []}
								console.log('4')
								// And push the first token into it.
								tokenObject.tokenArray.push(
									res.data.access_token,
								)
								console.log('5')
								// Then save it in memory.
								await setTokenInMemory(
									'plaid-tokens',
									JSON.stringify(tokenObject),
								)
								console.log('6')
							}
							console.log('5')
							this.refs[WEBVIEW_REF].reload()
							console.log('6')
							// Finally, navigate user to OnboardingTransition screen.
							this.props.navigation.navigate(
								'OnboardingTransition',
							)
						},
					)
				})
				.catch(error => {
					// Navigate to transition screen
					console.log('Error ', error)
					// if (error) { this.props.navigation.navigate('OnboardingTransition') }
				})
		}
	}

	render() {
		return (
			<WebView
				ref={WEBVIEW_REF}
				source={{uri}}
				onMessage={this.onMessage}
				useWebKit
				onLoad={() => console.log('loaded')}
				onLoadProgress={() => console.log('Progressing...')}
				onLoadStart={() => console.log('Load Starting!')}
				onLoadEnd={() => console.log('Load Ended!')}
			/>
		)
	}
}

export default PlaidLink
