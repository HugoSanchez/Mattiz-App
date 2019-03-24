import React from 'react';

import { createBottomTabNavigator } from 'react-navigation';

// Components 
import Dashboard from '../../screens/Dashboard';
import Settings from '../../screens/Settings';
import Transactions from '../../screens/Transactions';
import Products from '../../screens/Products';

// Icons
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const LoggedInNavigator = createBottomTabNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon 
                    name='wallet' 
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
                    name='list' 
                    size={25} 
                    style={{ paddingTop: 12 }} 
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