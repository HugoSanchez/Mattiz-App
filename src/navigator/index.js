import { createSwitchNavigator } from 'react-navigation';

import LoggedOutNavigator from './LoggedOut';
import LoggedInNavigator from './LoggedIn';

export const getRootNavigator = () => createSwitchNavigator(
    {
        LoggedOut: {
            screen: LoggedOutNavigator
        },
        loggedIn: {
            screen: LoggedInNavigator
        }
    },
    {
        initialRouteName: 'LoggedOut'
    }
);