import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';

// Components.
import CustomCard  from '../../components/common/CustomCard';
import StatusDot from '../../components/common/StatusDot'
import StackedAreaExample from '../../components/common/LineChart';
import StatsCard from '../../components/StatsCard';

// Redux actions.
import { loadPlaidInfo } from '../../actions';

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
                    <View style={{ alignSelf: 'stretch', alignItems: 'center', marginTop: 27 }}>
                        <Text style={[styles.textStyle, { fontSize: 32, marginTop: 75, marginBottom: 5 }]}>
                            $ {  this.props.balance }
                        </Text>                    
                        <Text style={styles.textStyle}> Aggregated Balance </Text>
                        <StackedAreaExample />
                    </View>
                </CustomCard>

                <View style={[styles.boxContainer, styles.splitBox ]}>
                    <CustomCard style={styles.smalleBoxContainer} elevated={true}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ethDashboard')} >
                            <StatusDot positive={true} size={10}/>
                            <Text style={[styles.textStyle, { fontSize: 22, marginLeft: 5 }]}>
                                $1,365 <Text style={[styles.textStyle, { fontSize: 12 }]}> ETH </Text>
                            </Text>
                        </TouchableOpacity > 
                    </CustomCard>

                    <CustomCard style={styles.smalleBoxContainer} elevated={true}>
                        <TouchableOpacity onPress={() => null} >
                            <StatusDot positive={false} size={10}/>
                            <Text style={[styles.textStyle, { fontSize: 22, marginLeft: 5 }]}>
                                $3,445 <Text style={[styles.textStyle, { fontSize: 12 }]}> BTC</Text>
                            </Text> 
                        </TouchableOpacity > 
                    </CustomCard>
                </View>

                <View style={styles.boxContainer}>
                    <StatsCard
                        icon={"credit-card"}
                        text={"April Spenditures: "}
                        amount={'347,85'} 
                    />
                </View>

                <View style={styles.boxContainer}>
                    <StatsCard
                        icon={"arrow-right-circle"}
                        text={"April Income: "}
                        amount={'3.323,85'} 
                    />
                </View>

                <View style={styles.boxContainer}>
                    <StatsCard
                        icon={"activity"}
                        text={"April Interests Earned: "}
                        amount={'127,85'} 
                    />
                </View>

                <View style={styles.boxContainer}>
                    <StatsCard
                        icon={"trending-up"}
                        text={"Total Investment Value: "}
                        amount={'4.810,00'} 
                    />
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
        borderRadius: 0,
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderRadius: 2,
        borderColor: '#E5F2D4',
    },
    splitBox: {
        flexDirection: 'row'
    },
    smalleBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
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

const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(Dashboard));
