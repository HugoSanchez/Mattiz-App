import React, {Component} from 'react'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'
import {connect} from 'react-redux'

import Header from '../../components/common/Header'

class ListingDetailWebview extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<Header
					goBack={true}
					onPressBack={() =>
						this.props.navigation.navigate('Housers')
					}
				/>
				<WebView
					style={{flex: 1, borderWidth: 3, borderColor: '#000'}}
					source={{uri: this.props.navigation.getParam('url')}}
					useWebKit
					onLoad={() => console.log('loaded')}
					onLoadProgress={() => console.log('Progressing...')}
					onLoadStart={() => console.log('Load Starting!')}
					onLoadEnd={() => console.log('Load Ended!')}
				/>
			</View>
		)
	}
}

const MapStateToProps = state => {
	const {user, error} = state.auth
	return {
		user,
		error,
	}
}

export default connect(
	MapStateToProps,
	{},
)(ListingDetailWebview)
