import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import axios from 'axios';

import { getMarketData } from '../../api/auth';

// Components.
import CustomCard  from '../../components/common/CustomCard';
import StatusDot from '../../components/common/StatusDot'
import StackedAreaExample from '../../components/common/LineChart';
import SimpleLineChart from '../../components/charts/SimpleLineChart';
import StatsCard from '../../components/StatsCard';

// Redux actions.
import { loadPlaidInfo } from '../../actions';

class ethDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            price: ''
        }
    }

    componentWillMount() {
        getMarketData()
            .then(response => { this.setState({ data: response.data.rates}) })

        axios.get('https://api.cryptonator.com/api/ticker/eth-usd')
            .then( res => this.setState({price: parseInt(res.data.ticker.price)}) )
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
                        <Text style={styles.textStyle}> Eth Price </Text>
                        <SimpleLineChart  data={this.state.data} price={this.state.price}/>
                    </View>
                </CustomCard>

                <View style={[styles.boxContainer, styles.splitBox ]}>
                    <CustomCard style={styles.smalleBoxContainer} elevated={true}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('sendForm')} 
                        >
                            <Text style={[styles.textStyle, { fontSize: 18 }]}>
                                Send 
                            </Text>
                        </TouchableOpacity>
                    </CustomCard>

                    <CustomCard style={styles.smalleBoxContainer} elevated={true}>
                        <Text style={[styles.textStyle, { fontSize: 18 }]}> 
                            Receive 
                        </Text>
                    </CustomCard>
                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

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
        borderWidth: 1,
        borderColor: '#E5F2D4',
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 0,
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

export default connect(mapStateToProps, mapDispatchtoProps)(withNavigationFocus(ethDashboard));
