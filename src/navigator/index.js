import { createSwitchNavigator } from 'react-navigation';

import LoggedOutNavigator from './loggedOut';
import LoggedInNavigator from './loggedIn';
import ethNavigator from './loggedIn/ethNavigator';

export const RootNavigator = () => createSwitchNavigator(
    {
        LoggedOut: {
            screen: LoggedOutNavigator
        },
        LoggedIn: {
            screen: LoggedInNavigator
        },
        ethNavigator: {
            screen: ethNavigator
        }
    },
    {
        initialRouteName: 'ethNavigator'
    }
);
