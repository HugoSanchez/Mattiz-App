import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';

// Components.
import Header from '../../components/common/Header';
import CustomCard  from '../../components/common/CustomCard';
import StatusDot from '../../components/common/StatusDot'
import StackedAreaExample from '../../components/common/LineChart';
import SimpleLineChart from '../../components/charts/SimpleLineChart';
import StatsCard from '../../components/StatsCard';

// Redux actions.
import { loadPlaidInfo } from '../../actions';

//General Styles & Colors
import GS from '../../styles'
import colors from '../../constants/colors'

// Number parser 
const numeral = require('numeral');

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadPlaidInfo();
    }

    render() {

        return (
            <View style={styles.container}>
                <Header />
                <CustomCard style={styles.balanceBoxContainer} elevated={false}>
                    <View style={{ flex: 5, alignSelf: 'stretch', alignItems: 'center', boderWidth: 1, borderColor: '#000' }}>
                        <SimpleLineChart data={[4, 5, 4, 6, 8, 4, 5, 6, 10, 12, 10 ]}>
                        <View style={{ alignSelf: 'stretch', alignItems: 'center', paddingTop: '5%' }}>
                            <Text style={[ GS.extraSmallBoldNumber, { color: colors.numbersGreen } ]}>
                                0.92%
                            </Text> 
                            <Text style={ GS.bigLightNumber }>
                                {  numeral(this.props.balance).format('0,0.00') } €
                            </Text>                    
                            <Text style={styles.textStyle}> Aggregated Balance </Text>
                        </View>
                        </SimpleLineChart>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', marginRight: '8%', marginLeft: '8%', marginTop: '15%' }}>
                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                            <Text style={GS.extraSmallLightTitle}> Week </Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                             <Text style={[GS.extraSmallLightTitle, {fontFamily: 'Raleway-SemiBold'}]}> Month </Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                            <Text style={GS.extraSmallLightTitle}> Quarter </Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                            <Text style={GS.extraSmallLightTitle}> Year </Text>
                        </View>
                    </View> 
                </CustomCard>

                <View style={ styles.boxContainer }>
                    <View style={{ flex: 4, flexDirection: 'row', paddingLeft: '2%', paddingRight: '2%' }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#F7DDDD', borderRadius: 10 }}>
                                <Image 
                                    style={{ height: 45, width: 45 }}
                                    source={require('../../assets/totalBag.png')}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#DDEDF7', borderRadius: 10 }}>
                                <Image 
                                    style={{ height: 45, width: 45 }}
                                    source={require('../../assets/savingsIcon.png')}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#E7F7DD', borderRadius: 10 }}>
                                <Image 
                                    style={{ height: 45, width: 45 }}
                                    source={require('../../assets/smallEtherIcon.png')}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#F7F4DD', borderRadius: 10 }}>
                                <Image 
                                    style={{ height: 45, width: 45 }}
                                    source={require('../../assets/smallBitcoinIcon.png')}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#DDF7F6', borderRadius: 10 }}>
                                <Image 
                                    style={{ height: 45, width: 45 }}
                                    source={require('../../assets/plusSign.png')}
                                />
                            </View>
                        </View>
                    </View>
                    
                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: '2%', paddingRight: '2%', marginBottom: '2%'}}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.buttonsText}> Total </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.buttonsText}> Savings </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.buttonsText}> Ether </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.buttonsText}> Bitcoin </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.buttonsText}> Others </Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#F7F6F6',
    },
    balanceBoxContainer: {
        height: '40%',
        width: '100%',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 2,
    },
    boxContainer: {
        height: '12%',
        width: '95%',
        backgroundColor: '#FFF',
        margin: 10,
        marginLeft: '2.5%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 2,
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
    balanceStyle: {
        fontFamily: 'Aleo-Light',
        fontSize: 32
    },
    textStyle: {
        fontFamily: 'Raleway-Light',
        fontSize: 14,
        color: colors.primaryBlue
    },
    buttonsText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 14,
        color: colors.primaryBlue
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

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (withNavigationFocus(Dashboard)
);
