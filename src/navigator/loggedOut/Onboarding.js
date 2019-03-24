import { createStackNavigator } from 'react-navigation';

// Components.
import SignUpForm from '../../screens/SignUpForm';


const OnboardingNavigator = createStackNavigator({
    SignUp: {
        screen: SignUpForm,
        navigationOptions: {
            header: null,
        }
    },
});

export default OnboardingNavigator;