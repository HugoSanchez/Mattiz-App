import { createStackNavigator } from 'react-navigation';

import OutScreen from '../screens/OutScreen';

const LoggedOutNavigator = createStackNavigator({
    Login: {
        screen: OutScreen,
        navigationOptions: {
            header: null,
        }
    },
});

export default LoggedOutNavigator;