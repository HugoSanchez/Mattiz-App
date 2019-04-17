import { createStackNavigator } from 'react-navigation';

// Screens.
import ethDashboard from '../../../screens/loggedIn/ethDashboard';

const ethNavigator = createStackNavigator({
    ethDashboard: {
        screen: ethDashboard,
        navigationOptions: {
            header: null,
        }
    },
},
{
    initialRouteName: 'ethDashboard'
});

export default ethNavigator;