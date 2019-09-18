import { createSwitchNavigator } from 'react-navigation';

// Screens.
import QrCodeScanner from '../../screens/utils/QrCodeScanner';

const UtilsNavigator = createSwitchNavigator({
    QrCodeScanner: {
        screen: QrCodeScanner,
        navigationOptions: {
            header: null,
        }
    }
},
{
    initialRouteName: 'QrCodeScanner'
});

export default UtilsNavigator;