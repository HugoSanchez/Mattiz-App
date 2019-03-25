import React, { Component } from 'react';

import PlaidAuthenticator from 'react-native-plaid-link';

import { getAccessToken, setTokenInMemory, getTokenFromMemory } from '../api/auth';

class PlaidLink extends Component {

    onMessage = (data) => {
        // Parse message results to a readable key.
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
                        // Finally, navigate user to OnboardingTransition screen.
                        this.props.navigation.navigate('OnboardingTransition') 
                    })
                })
                .catch(error => {
                    // Navigate to transition screen
                    if (error) { this.props.navigation.navigate('OnboardingTransition') }
                })
        }
    }

    render() {
        return (
            <PlaidAuthenticator
                onMessage={this.onMessage}
                publicKey="cbc3786c0826ebad66f33cecc745dc"
                env="sandbox"
                product="auth,transactions"
                clientName="Mattiz"
                selectAccount={false}
            />
        );
    }
}

export default PlaidLink;
