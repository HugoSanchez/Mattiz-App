import { createStackNavigator } from 'react-navigation';

import OutScreen from '../screens/OutScreen';

const LoggedOutNavigator = createStackNavigator({
    Login: {
        screen: OutScreen,
    },
});

export default LoggedOutNavigator;