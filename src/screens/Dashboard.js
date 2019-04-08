import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

// Connect.
import { connect } from 'react-redux';

// Redux actions.
import { loadPlaidInfo } from '../actions/PlaidActions';

class Dashboard extends Component {

    state = {
        showModal: false,
    }

    componentWillMount() {
        this.props.loadPlaidInfo();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.balanceBoxContainer}>
                    <Text style={styles.textStyle}> You are now looged in! </Text>
                </View>

                <View style={[styles.boxContainer, styles.splitBox ]}>
                    <View style={styles.smalleBoxContainer}>
                        
                    </View>
                    <View style={styles.smalleBoxContainer}>

                    </View>
                </View>

                <View style={styles.boxContainer}>
                    <View style={styles.statusAvatar}>

                    </View>
                </View>

                <View style={styles.boxContainer}>
                    <View style={styles.statusAvatar}>

                    </View>
                </View>

                <View style={styles.boxContainer}>
                    <View style={styles.statusAvatar}>

                    </View>
                </View>

                <View style={styles.boxContainer}>
                    <View style={styles.statusAvatar}>

                    </View>
                </View>
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
    },
    balanceBoxContainer: {
        flex: 4,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderRadius: 2,
        borderColor: '#E5F2D4',
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 2,
        borderBottomWidth: 0,
        borderRadius: 2,
        borderColor: '#E5F2D4',
    },
    splitBox: {
        flexDirection: 'row'
    },
    smalleBoxContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 1,
        borderRadius: 2,
        borderColor: '#E5F2D4',
    },
    statusAvatar: {
        width: 20,
        height: 20, 
        borderRadius: 10,
        backgroundColor: '#E5F2D4',
        marginLeft: 16
    },
    textStyle: {
        fontFamily: 'Raleway-Light',
        fontSize: 22
    }
})

const mapDispatchtoProps = dispatch => ({
    loadPlaidInfo: () => dispatch(loadPlaidInfo()),
});

const mapStateToProps = state => {
    const { balance, transactions } = state.plaid;
    return {
        balance,
        transactions
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withNavigationFocus(Dashboard));
