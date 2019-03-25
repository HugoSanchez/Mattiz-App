import React, { Component } from 'react';
import { View } from 'react-native';

import PlaidAuthenticator from 'react-native-plaid-link';

import { getAccessToken, setTokenInMemory, getTokenFromMemory } from '../api/auth';

class PlaidLink extends Component {

    // TODO: Change token functions.
    // Create access token array and set in memory. (if, else)

    onMessage = (data) => {
        console.log(data)
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
                            JSON.parse(tokens).push(res.access_token)
                            // Push the new token and save again.
                            await setTokenInMemory('plaid-tokens', JSON.stringify(tokens));
                            // If not, 
                        } else {
                            // Create the token array and push the first token into it.
                            tokens = [].push(res.access_token)
                            // Then save it in memory.
                            await setTokenInMemory('plaid-tokens', JSON.stringify(tokens))
                        }
                        // Finally, navigate user to onboardingTransition screen.
                        this.props.navigation.navigate('onboardingTransition') 
                    })
                })
                .catch(error => {
                    // Navigate to transition screen
                    if (error) { this.props.navigation.navigate('onboardingTransition') }
                })
        }
    }

    render() {
        return (
            <View>
                <PlaidAuthenticator
                    onMessage={this.onMessage}
                    publicKey="cbc3786c0826ebad66f33cecc745dc"
                    env="sandbox"
                    product="auth,transactions"
                    clientName="Mattiz"
                    selectAccount={false}
                />
            </View>
        );
    }
}

// Export class and connect to redux state. 
