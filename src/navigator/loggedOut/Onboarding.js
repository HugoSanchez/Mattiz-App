import { createStackNavigator } from 'react-navigation';

// Screens.
import SignUpForm from '../../screens/SignUpForm';
import NewUserWelcomeScreen from '../../screens/NewUserWelcomeScreen';
import PlaidLink from '../../screens/PlaidLink';


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
    PaidLink: {
        screen: PlaidLink,
        navigationOptions: {
            header: null,
        }
    },
},
{
    initialRouteName: 'Welcome'
});

export default OnboardingNavigator;