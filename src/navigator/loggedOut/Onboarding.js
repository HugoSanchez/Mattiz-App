import { createSwitchNavigator } from 'react-navigation';

// Screens.
import SignUpForm from '../../screens/loggedOut/SignUpForm';
import NewUserWelcomeScreen from '../../screens/loggedOut/NewUserWelcomeScreen';
import PlaidLink from '../../screens/loggedOut/PlaidLink';
import OnboardingTransition from '../../screens/loggedOut/OnboardingTransition'
import GenerateWallet from '../../screens/loggedOut/GenerateWallet';


const OnboardingNavigator = createSwitchNavigator({
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
    GenerateWallet: {
        screen: GenerateWallet,
        navigationOptions: {
            header: null,
        }
    },
},
{
    initialRouteName: 'SignUp'
});

export default OnboardingNavigator;