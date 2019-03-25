import { createStackNavigator } from 'react-navigation';

// Screens.
import SignUpForm from '../../screens/SignUpForm';
import NewUserWelcomeScreen from '../../screens/NewUserWelcomeScreen';
import PlaidLink from '../../screens/PlaidLink';
import OnboardingTransition from '../../screens/OnboardingTransition'


const OnboardingNavigator = createStackNavigator({
    SignUp: {
        screen: SignUpForm,
        navigationOptions: {
            header: null,
        }
    },
    Welcome: {
        screen: NewUserWelcomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    PlaidLink: {
        screen: PlaidLink,
        navigationOptions: {
            header: null,
        }
    },
    OnboardingTransition: {
        screen: OnboardingTransition,
        navigationOptions: {
            header: null,
        }
    },
},
{
    initialRouteName: 'Welcome'
});

export default OnboardingNavigator;