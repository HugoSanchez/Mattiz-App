import React, { Component } from 'react';
import { WebView } from 'react-native';

import PlaidAuthenticator from 'react-native-plaid-link';

import { getAccessToken, setTokenInMemory, getTokenFromMemory } from '../api/auth';

const WEBVIEW_REF = 'webview';
const publicKey = "cbc3786c0826ebad66f33cecc745dc";
const env = 'sandbox';
const product = "auth,transactions";
const clientName = "Mattiz."
const selectAccount = false
const uri = `https://cdn.plaid.com/link/v2/stable/link.html?key=${
      publicKey
    }&apiVersion=v2&env=${env}&product=${product}&clientName=${
      clientName
    }&isWebView=true&isMobile=true&selectAccount=${
      selectAccount
    }`;

class PlaidLink extends Component {

    state = {
        ref: null
    }

    componentWillMount() {
        if (this.props.navigation.getParam('reload')) {
            console.log('PARAAAM!!!', this.props.navigation.getParam('reload'))
        }
    }

    onMessage = e => {

        const data = JSON.parse(e.nativeEvent.data)
        const key = data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase();

        if (key === 'CONNECTED') {
            // Call API method to get access token.
            getAccessToken(data.metadata.public_token)
                // Save token in memory.
                .then(async res => {
                    // First check if there already exists a 'plaid-token' item in memory.
                    await getTokenFromMemory('plaid-tokens').then(async tokens => {
                        // If so,
                        if (tokens) {
                            // Parse it to get the token array,
                            const tokenObject = JSON.parse(tokens)
                            // Push the new token
                            tokenObject.tokenArray.push(res.data.access_token)
                            // And save again.
                            await setTokenInMemory('plaid-tokens', JSON.stringify(tokenObject))
                            // If not, 
                        } else {
                            // Create the token object and array 
                            const tokenObject = {'tokenArray': []};
                            // And push the first token into it.
                            tokenObject.tokenArray.push(res.data.access_token)
                            // Then save it in memory.
                            await setTokenInMemory('plaid-tokens', JSON.stringify(tokenObject))
                        }
                        this.refs[WEBVIEW_REF].reload()
                        // Finally, navigate user to OnboardingTransition screen.
                        this.props.navigation.navigate('OnboardingTransition') 
                    })
                })
                .catch(error => {
                    // Navigate to transition screen
                    console.log('Error ', error)
                    // if (error) { this.props.navigation.navigate('OnboardingTransition') }
                })
        }
    }

    reloadWebView() {
        this.refs[WEBVIEW_REF].reload();
    }

    render() {
        return(
        <WebView
            ref={WEBVIEW_REF}
            source={{ uri }}
            onMessage={this.onMessage}
            useWebKit
        />
        /** 
        return (
            <PlaidAuthenticator
                onMessage={this.onMessage}
                publicKey="cbc3786c0826ebad66f33cecc745dc"
                env="sandbox"
                product="auth,transactions"
                clientName="Mattiz"
                selectAccount={false}
                onLoad={() => console.log('loading... ')}
                onLoadEnd={() => console.log('loading ended ...')}
                ref={WEBVIEW_REF}
            />
        */
        );
    }
}

export default PlaidLink;
