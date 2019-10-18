/* eslint-disable react/jsx-key */
import React, {Component} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {List} from 'react-native-elements'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import Header from '../../components/common/Header'
import HousersListingCard from '../../components/HousersListingCard'

import Housers from '../../assets/housers.json'

class HousersMain extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<Header
					goBack={true}
					onPressBack={() =>
						this.props.navigation.navigate('Products')
					}
				/>
				<ScrollView>
					{Housers.map(l => {
						// eslint-disable-next-line react/jsx-key
						return (
							<View style={{marginBottom: 15}}>
								<HousersListingCard
									onDetailPress={() => {
										console.log('pressed')
										this.props.navigation.navigate(
											'ListingDetailWebview',
											{url: l.url},
										)}
									}
									listing={l}
									key={l.name}
								/>
							</View>
						)
					})}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})

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
)(HousersMain)
