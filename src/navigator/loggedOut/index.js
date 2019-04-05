import { createSwitchNavigator } from 'react-navigation';

// Screens.
import InitialLoadingScreen from '../../screens/InitialLoadingScreen';
import LoginForm from '../../screens/LoginForm';

// Nested onboarding navigator.
import OnboardingNavigator from './Onboarding';


const LoggedOutNavigator = createSwitchNavigator({
    InitialLoading: {
        screen: InitialLoadingScreen,
        navigationOptions: {
            header: null,
        }
    },
    Login: {
        screen: LoginForm,
        navigationOptions: {
            header: null,
        }
    },
    Onboarding: {
        screen: OnboardingNavigator,
        navigationOptions: {
            header: null,
        }
    },
},
{
    initialRouteName: 'InitialLoading'
});

export default LoggedOutNavigator;