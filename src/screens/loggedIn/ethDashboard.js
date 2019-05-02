import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity, 
    StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';


// Components.
import CustomCard  from '../../components/common/CustomCard';
import SimpleLineChart from '../../components/charts/SimpleLineChart';

// Redux actions.
import { 
    loadEthBalances,
    loadMarketData
} from '../../actions';

// Styles.
import GS from '../../styles';

class ethDashboard extends Component {

    componentDidMount() {
        this.props.loadEthBalances()
        this.props.loadMarketData()
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomCard style={styles.balanceBoxContainer} elevated={false}>
                    <TouchableOpacity
                        style={{ marginLeft: 15, marginTop: 25, alignSelf: 'flex-start' }}
                        onPress={() => this.props.navigation.navigate('Dashboard')} 
                    >
                        <Icon name='arrow-left' size={25} color={'#000'}/>
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'stretch', alignItems: 'center', marginTop: 27 }}>              
                        
                        <SimpleLineChart  data={this.props.historicEthPrice} >
                            <View style={{ alignItems: 'center'}}>
                                <Text style={ GS.bigNumberStyle}>
                                {
                                    parseFloat((this.props.currentEthPrice * this.props.balance) + 1360).toFixed(2)
                                }$
                                </Text>
                                <Text style={styles.textStyle}> Your ETH Balance </Text>
                                <Text style={[ GS.extraSmallBoldNumber, { marginTop: 15 } ]}>
                                {
                                    parseFloat(this.props.currentEthPrice).toFixed(2)
                                }$ 
                                </Text> 
                                <Text style={styles.textStyle}>Current Eth Price</Text>
                            </View>
                        </SimpleLineChart>
                    </View>
                </CustomCard>

                <View style={ styles.boxContainer }>
                    <View style={[styles.smalleBoxContainer, { marginLeft: 20, borderLeftWidth: 0 }]}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('sendForm')} >
                            <Text style={[styles.textStyle, { fontSize: 18, marginBottom: 10 }]}>
                                Send 
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.smalleBoxContainer, { marginRight: 20, borderRightWidth: 0 }]}>
                        <Text style={[styles.textStyle, { fontSize: 18, marginBottom: 10  }]}> 
                            Receive 
                        </Text>
                    </View>
                </View>

                <View style={{ flex: 4 }}>

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
        borderWidth: 0.5,
        borderColor: '#B3D980',
    },
    boxContainer: {
        flex: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    smalleBoxContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderColor: '#B3D980',
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

const MapStateToProps = state => {
    const { balance, transactions } = state.ethCommon;
    const { gasPrice, currentEthPrice, historicEthPrice } = state.marketData
    return {
        balance,
        transactions,
        currentEthPrice,
        historicEthPrice,
        gasPrice,
    };
}

const mapDispatchToProps = dispatch => ({
    loadMarketData: () => dispatch(loadMarketData()),
    loadEthBalances: () => dispatch(loadEthBalances()),
});

export default connect(MapStateToProps, mapDispatchToProps)(withNavigationFocus(ethDashboard));
