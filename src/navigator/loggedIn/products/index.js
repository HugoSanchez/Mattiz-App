import {createSwitchNavigator} from 'react-navigation'

// Screens.
import Products from '../../../screens/loggedIn/Products'
import HousersNavigator from '../../../screens/loggedIn/HousersMain'
import ListingDetailWebview from '../../../screens/loggedIn/ListingDetailWebview'


const ProductsNavigator = createSwitchNavigator(
	{
		Products: {
			screen: Products,
			navigationOptions: {
				header: null,
			},
		},
		ListingDetailWebview: {
			screen: ListingDetailWebview,
			navigationOptions: {
				header: null,
			},
		},
		Housers: {
			screen: HousersNavigator,
			navigationOptions: {
				header: null,
			},
		},
	},
	{
		initialRouteName: 'Products',
	},
)

export default ProductsNavigator
