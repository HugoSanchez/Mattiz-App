import {createSwitchNavigator} from 'react-navigation'

// Screens.
import HousersMain from '../../../../screens/loggedIn/HousersMain'

const HousersNavigator = createSwitchNavigator(
	{
		HousersMain: {
			screen: HousersMain,
			navigationOptions: {
				header: null,
			},
		},
	},
	{
		initialRouteName: 'HousersMain',
	},
)

export default HousersNavigator
