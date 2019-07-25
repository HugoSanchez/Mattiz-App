import React from 'react';

import { createBottomTabNavigator } from 'react-navigation';

// Components 
import Dashboard from '../../screens/loggedIn/Dashboard';
import Settings from '../../screens/loggedIn/Settings';
import Transactions from '../../screens/loggedIn/Transactions';
import Products from '../../screens/loggedIn/Products';

// Nested Navigators
import ethNavigator from './ethNavigator';

// Icons
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const LoggedInNavigator = createBottomTabNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon 
                    name='home' 
                    size={22} 
                    style={{ paddingTop: 12 }} 
                    color={tintColor}
                />
            )
        }
    },
    Transactions: {
        screen: Transactions,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon 
                    name='equalizer' 
                    size={20} 
                    style={{ marginTop: 13, transform: [{ rotate: '90deg'}] }} 
                    color={tintColor}
                />
            )
        }
    },
    Products: {
        screen: Products,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon 
                    name='layers' 
                    size={22} 
                    style={{ paddingTop: 12 }}
                    color={tintColor}
                />
            )
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon 
                    name='options' 
                    size={20} 
                    style={{ paddingTop: 12 }}
                    color={tintColor}
                />
            )
        }
    }
},
{
    tabBarOptions: {
        activeTintColor: '#A3D164',
        inactiveTintColor: '#5E5E5E',
        showIcon: true, 
        showLabel: false,
    }
});

export default LoggedInNavigator;