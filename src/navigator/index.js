import { createSwitchNavigator } from 'react-navigation';

import LoggedOutNavigator from './loggedOut';
import LoggedInNavigator from './loggedIn';

export const RootNavigator = () => createSwitchNavigator(
    {
        LoggedOut: {
            screen: LoggedOutNavigator
        },
        LoggedIn: {
            screen: LoggedInNavigator
        }
    },
    {
        initialRouteName: 'LoggedIn'
    }
);
