/* eslint-disable react/no-string-refs */
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
const countryCodes = ['US,GB,ES,FR']

const uri = `https://cdn.plaid.com/link/v2/stable/link.html?key=${publicKey}&countryCodes=${countryCodes}&apiVersion=v2&env=${env}&product=${product}&clientName=${clientName}&isWebView=true&isMobile=true&selectAccount=${selectAccount}`
class PlaidLink extends Component {
	onMessage = e => {
		const data = JSON.parse(e.nativeEvent.data)
		const key = data.action
			.substr(data.action.lastIndexOf(':') + 1)
			.toUpperCase()

		if (key === 'CONNECTED') {
			// Call API method to get access token.
			getAccessToken(data.metadata.public_token)
				// Save token in memory.
				.then(async tokenInfo => {
					debugger
					// First check if there already exists a 'plaid-token' item in memory.
					await getTokenFromMemory('plaid-tokens').then(
						async tokens => {
							debugger
							// If so,
							if (tokens) {
								// Parse it to get the token array,
								const tokenObject = JSON.parse(tokens)
								// Push the new token
								tokenObject.tokenArray.push(
									tokenInfo.access_token,
								)
								// And save again.
								await setTokenInMemory(
									'plaid-tokens',
									JSON.stringify(tokenObject),
								)
								// If not,
							} else {
								// Create the token object and array
								const tokenObject = {tokenArray: []}
								// And push the first token into it.
								tokenObject.tokenArray.push(
									tokenInfo.access_token,
								)
								// Then save it in memory.
								await setTokenInMemory(
									'plaid-tokens',
									JSON.stringify(tokenObject),
								)
							}
							this.refs[WEBVIEW_REF].reload()
							// Finally, navigate user to OnboardingTransition screen.
							this.props.navigation.navigate(
								'OnboardingTransition',
							)
						},
					)
				})
				.catch(error => {
					debugger
					// Navigate to transition screen
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
