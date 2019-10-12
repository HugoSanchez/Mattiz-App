/* eslint-disable react/display-name */
import React from 'react'

import {createBottomTabNavigator} from 'react-navigation'

// Components
import Dashboard from '../../screens/loggedIn/Dashboard'
import Settings from '../../screens/loggedIn/Settings'
import Transactions from '../../screens/loggedIn/Transactions'
import Products from '../../screens/loggedIn/Products'

// Icons
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Colors
import colors from '../../constants/colors'

const LoggedInNavigator = createBottomTabNavigator(
	{
		Dashboard: {
			screen: Dashboard,
			navigationOptions: {
				tabBarIcon: ({tintColor}) => (
					<Icon
						name="home"
						size={22}
						style={{paddingTop: 12}}
						color={tintColor}
					/>
				),
			},
		},
		Transactions: {
			screen: Transactions,
			navigationOptions: {
				tabBarIcon: ({tintColor}) => (
					<Icon
						name="equalizer"
						size={20}
						style={{marginTop: 13, transform: [{rotate: '90deg'}]}}
						color={tintColor}
					/>
				),
			},
		},
		Products: {
			screen: Products,
			navigationOptions: {
				tabBarIcon: ({tintColor}) => (
					<Icon
						name="layers"
						size={22}
						style={{paddingTop: 12}}
						color={tintColor}
					/>
				),
			},
		},
		Settings: {
			screen: Settings,
			navigationOptions: {
				tabBarIcon: ({tintColor}) => (
					<Icon
						name="options"
						size={20}
						style={{paddingTop: 12}}
						color={tintColor}
					/>
				),
			},
		},
	},
	{
		tabBarOptions: {
			activeTintColor: colors.palleteDarkGreen,
			inactiveTintColor: colors.paletteGray,
			showIcon: true,
			showLabel: false,
			style: {
				backgroundColor: '#FFF',
			},
		},
	},
)

export default LoggedInNavigator
