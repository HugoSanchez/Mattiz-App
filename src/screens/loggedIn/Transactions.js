import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import ListItemTx from '../../components/ListItemTxs';

import colors from '../../constants/colors'

class Transactions extends Component {

    static navigationOptions = {
        title: 'Stats',
        drawerIcon: ({ focused }) => (
            <Icon 
                name={'equalizer'} 
                size={20} 
                color={ focused ? colors.palleteDarkGreen : colors.paletteGray} 
                style={{ transform: [{ rotate: '90deg'}] }}
            /> 
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1, marginTop: 45, alignSelf: 'stretch' }}> 
                    <View>
                        {
                            this.props.transactions.map((tx, i) => (
                                <ListItemTx tx={tx} key={i}/>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})


const MapStateToProps = state => {
    const transactions = state.plaid.transactions
    return {
        transactions
    };
}

export default connect(MapStateToProps, {})(Transactions);