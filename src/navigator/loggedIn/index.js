import React from 'react';
import { Dimensions } from 'react-native';

import { createDrawerNavigator } from 'react-navigation';

// Components 
import Dashboard from '../../screens/loggedIn/Dashboard';
import Settings from '../../screens/loggedIn/Settings';
import Transactions from '../../screens/loggedIn/Transactions';
import Products from '../../screens/loggedIn/Products';

// Icons
import Icon from 'react-native-vector-icons/SimpleLineIcons';

// Colors
import colors from '../../constants/colors'

// Dims. 
const width =  Dimensions.get('window').width

const LoggedInNavigator = createDrawerNavigator({
    Dashboard: Dashboard,
    Stats: Transactions,
    Products: Products,
    Settings: Settings,
},
{   
    hideStatusBar: true,
    drawerType: 'back',
    drawerWidth: width * 0.80,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#6b52ae',
    contentOptions: {
        activeTintColor: colors.palleteDarkGreen,
        inactiveTintColor: colors.paletteGray,
        labelStyle: {
            fontFamily: 'Didot',
            fontSize: 20
        }
    },
    
    /*drawerType: 'slide',
    drawerPosition: 'left',
    drawerWidth: '85%',
    drawerBackgroundColor: '#FFF',
    activeTintColor: colors.palleteDarkGreen,
    inactiveTintColor: colors.paletteGray,
    */
});

export default LoggedInNavigator;