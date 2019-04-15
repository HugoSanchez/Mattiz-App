import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ListItemTx from '../components/ListItemTxs';

class Transactions extends Component {

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