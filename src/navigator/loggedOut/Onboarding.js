import { createStackNavigator } from 'react-navigation';

// Components.
import SignUpForm from '../../screens/SignUpForm';
import NewUserWelcomeScreen from '../../screens/NewUserWelcomeScreen';


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
},
{
    initialRouteName: 'Welcome'
});

export default OnboardingNavigator;