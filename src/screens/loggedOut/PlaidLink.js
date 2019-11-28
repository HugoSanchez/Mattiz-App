/* eslint-disable react/no-string-refs */
import React, {Component} from 'react'
import {WebView} from 'react-native-webview'

import {
	getPlaidAccessToken,
	setTokenInMemory,
	getTokenFromMemory,
} from '../../api'

const WEBVIEW_REF = 'webview'
const publicKey = 'cbc3786c0826ebad66f33cecc745dc'
const env = 'sandbox'
const product = 'auth,transactions'
const clientName = 'Mattiz.'
const selectAccount = false
const countryCodes = ['US,GB,ES,FR']

const uri = `https://cdn.plaid.com/link/v2/stable/link.html?key=${publicKey}&countryCodes=${countryCodes}&apiVersion=v2&env=${env}&product=${product}&clientName=${clientName}&isWebView=true&isMobile=true&selectAccount=${selectAccount}`
class PlaidLink extends Component {
	onMessage = async e => {
		const data = JSON.parse(e.nativeEvent.data)
		const key = data.action
			.substr(data.action.lastIndexOf(':') + 1)
			.toUpperCase()

		console.log('KEY: ', key)

		if (key === 'CONNECTED') {
			console.log('About to call access token', getPlaidAccessToken)
			let res = await getPlaidAccessToken(data.metadata.public_token)
			console.log('res: ', res)
			let response = await eschangePublicToken(data.metadata.public_token)
			console.log('response: ', response)
			let accessToken = response.data.access_token
			// First check if there already exists a 'plaid-token' item in memory.
			let tokens = await getTokenFromMemory('plaid-tokens')
			// If so,
			if (tokens) {
				pushAndSaveNewTokenToTokenArray(tokens, accessToken)
				// If not,
			} else {
				createTokenArray(res.data.access_token)
			}
			this.refs[WEBVIEW_REF].reload()
			// Finally, navigate user to OnboardingTransition screen.
			this.props.navigation.navigate('OnboardingTransition')
		}
	}

	// Echange public for access token.
	async eschangePublicToken(token) {
		// eslint-disable-next-line prettier/prettier
		try { await getAccessToken(token)} 
			// eslint-disable-next-line prettier/prettier
		catch (e) {console.error(e)}
	}

	// Parse token array and store new token.
	async pushAndSaveNewTokenToTokenArray(tokens, accessToken) {
		const tokenObject = JSON.parse(tokens)
		tokenObject.tokenArray.push(accessToken)
		await setTokenInMemory('plaid-tokens', JSON.stringify(tokenObject))
	}

	// Create token array and store new token.
	async createTokenArray(accessToken) {
		const tokenObject = {tokenArray: []}
		tokenObject.tokenArray.push(accessToken)
		await setTokenInMemory('plaid-tokens', JSON.stringify(tokenObject))
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
