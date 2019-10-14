import {createSwitchNavigator} from 'react-navigation'

import LoggedOutNavigator from './loggedOut'
import LoggedInNavigator from './loggedIn/BottomTab'
import UtilsNavigator from './utils'

export const RootNavigator = () =>
	createSwitchNavigator(
		{
			LoggedOut: {
				screen: LoggedOutNavigator,
			},
			LoggedIn: {
				screen: LoggedInNavigator,
			},
			Utils: {
				screen: UtilsNavigator,
			},
		},
		{
			initialRouteName: 'LoggedOut',
		},
	)
