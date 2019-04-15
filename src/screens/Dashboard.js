import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';

// Components.
import CustomCard  from '../components/common/CustomCard';
import StackedAreaExample from '../components/common/LineChart';

// Redux actions.
import { loadPlaidInfo } from '../actions/PlaidActions';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

        // this.props.loadPlaidInfo();
    }

    render() {

        return (
            <View style={styles.container}>
                <CustomCard style={styles.balanceBoxContainer} elevated={true}>
                    <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                        <View style={{ marginTop: 95}}>
                        <Text style={[styles.textStyle, { fontSize: 32, marginBottom: 5 }]}>
                            $ {  this.props.balance }
                        </Text>                    
                        <Text style={styles.textStyle}> Your aggregated Balance </Text>
                        </View>
                        <StackedAreaExample />
                    </View>
                </CustomCard>

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
        marginTop: 0, 
        marginLeft: 0,
        marginRight: 0,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 14
    }
})

const mapDispatchtoProps = dispatch => ({
    loadPlaidInfo: () => dispatch(loadPlaidInfo()),
});

const mapStateToProps = state => {
    const { balance, transactions, loading } = state.plaid;
    return {
        balance,
        transactions,
        loading
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withNavigationFocus(Dashboard));
