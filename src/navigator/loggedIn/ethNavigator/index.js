import { createStackNavigator } from 'react-navigation';

// Screens.
import ethDashboard from '../../../screens/loggedIn/ethDashboard';
import sendForm from '../../../screens/loggedIn/sendForm';
import loadingTx from '../../../screens/loggedIn/loadingTx';

const ethNavigator = createStackNavigator({
    ethDashboard: {
        screen: ethDashboard,
        navigationOptions: {
            header: null,
        }
    },
    sendForm: {
        screen: sendForm,
        navigationOptions: {
            header: null,
        }
    },
    loadingTx: {
        screen: loadingTx,
        navigationOptions: {
            header: null,
        }
    }
},
{
    initialRouteName: 'ethDashboard'
});

export default ethNavigator;