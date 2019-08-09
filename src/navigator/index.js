import { createSwitchNavigator } from 'react-navigation';

import LoggedOutNavigator from './loggedOut';
import LoggedInNavigator from './loggedIn';
import UtilsNavigator from './utils';

export const RootNavigator = () => createSwitchNavigator(
    {
        LoggedOut: {
            screen: LoggedOutNavigator
        },
        LoggedIn: {
            screen: LoggedInNavigator
        },
        Utils: {
            screen: UtilsNavigator
        }
    },
    {
        initialRouteName: 'LoggedIn'
    }
);
