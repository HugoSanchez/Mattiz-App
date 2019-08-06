import React, { Component } from 'react';
import {  View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';

import CustomCard from './common/CustomCard';
import PalmButton from './common/PalmButton';

import {
    setAmountInReduxState,
    setAddressInReduxState,
    initiateTxSend,
} from '../actions'

import colors from '../constants/colors';
import styles from '../styles';

// Number parser 
const numeral = require('numeral');

class SendEthForm extends Component {

    state = {
        amountElevated: null,
        toElevated: null
    }

    render() {

        const { 
            amountElevated,
            toElevated 
        } = this.state

        const {
            container,
            cardContainer,
            cardStyle,
            titleContainer,
            textInput,
            placeholder,
            amountInputContainer,
            addressInputContainer,
            feeAndBalanceContainer,
            feeAndBalanceNumbers,
            feeBox,
            balanceBox,
            balanceTitle,
            buttonContainer,
        } = compStyles;

        const {
            amount,
            address,
            setAmountInReduxState,
            setAddressInReduxState
        } = this.props;

        return (
            <View style={container}>
                <View style={cardContainer}>
                    <CustomCard style={cardStyle} elevated={amountElevated}>
                        <View style={{ flex: 3 }}>
                            <Text style={ titleContainer }>
                                Amount: 
                            </Text>
                        </View>
                        <View style={{ flex: 1.5 }}>
                            <Input 
                                placeholder="0.000"
                                inputContainerStyle={amountInputContainer}
                                placeholderTextColor='#040026'
                                value={ amount } 
                                secureTextEntry={false}
                                onFocus={ () => this.setState({ amountElevated: true })}
                                onEndEditing={ () => this.setState({ amountElevated: false })}
                                onChangeText={ value => setAmountInReduxState(value)}
                                inputStyle={ amount > 0 ? textInput : placeholder }
                            />
                        </View>
                    </CustomCard>
                </View>

                <View style={cardContainer}>
                    <CustomCard style={cardStyle} elevated={toElevated}>
                        <View style={{ flex: 1 }}>
                            <Text style={ titleContainer }>
                                Address: 
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Input 
                                placeholder="0x ..."
                                inputContainerStyle={ addressInputContainer }
                                placeholderTextColor='#040026'
                                value={ address }
                                secureTextEntry={false}
                                onFocus={ () => this.setState({ toElevated: true })}
                                onEndEditing={ () => this.setState({ toElevated: false })}
                                onChangeText={ value => setAddressInReduxState(value) }
                                inputStyle={ address > 0 ? textInput : placeholder  }
                            />
                        </View>
                    </CustomCard>
                </View>

                <View style={ feeAndBalanceContainer }>
                    <View style={ feeBox }>
                        <Text style={ titleContainer }>
                            Fee:  
                                <Text style={ feeAndBalanceNumbers }>
                                    {   
                                        amount > 0 ?
                                        '   $' +
                                        parseFloat( this.props.gasPrice * this.props.currentPriceETH * 21000 ).toFixed(3)
                                        :
                                        '   ' + 0.0000
                                    }
                                </Text>
                        </Text>
                    </View>

                    <View style={ balanceBox }>
                        <Text style={ balanceTitle }>
                            Balance:  
                                <Text style={ feeAndBalanceNumbers }>
                                {   
                                    '   $' 
                                    + 
                                    parseFloat((this.props.balance * this.props.currentPriceETH) 
                                    - ((this.props.amount * this.props.currentPriceETH ) 
                                    + this.props.gasPrice * this.props.currentPriceETH * 21000))
                                    .toFixed(2) 
                                }
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={ buttonContainer }>
                    <PalmButton 
                        iconName={'check-circle'}
                        onPress={() => this.props.initiateTxSend()}
                        title={'Send Transaction!'}
                        titleStyle={{ fontFamily: 'Raleway-Regular'}}
                    />
                </View>
            </View>
        )
    }
}

const compStyles = {
    container: { 
        flex: 6, 
        alignSelf: 'stretch' 
    },
    cardContainer: { 
        flex: 2, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    cardStyle: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    titleContainer: [ 
        styles.extraSmallLightTitle, {
            marginLeft: 20 
        } 
    ],
    amountInputContainer: { 
        borderBottomColor: 'transparent', 
        marginRight: 45, 
        marginTop: 5 
    },
    addressInputContainer: { 
        borderBottomColor: 'transparent', 
        marginTop: 5 
    },
    feeAndBalanceContainer: { 
        flex: 2, 
        flexDirection: 'row', 
        margin: '2%' 
    },
    feeBox: { 
        flex: 1, 
        flexDirection: 'row',  
        alignItems: 'center' 
    },
    balanceBox: { 
        flex: 1.5, 
        flexDirection: 'row',  
        alignItems: 'center' 
    },
    balanceTitle: [ 
        styles.extraSmallLightTitle, { 
            marginLeft: 35 
        } 
    ],
    feeAndBalanceNumbers: [ 
        styles.extraSmallRegularNumber, { 
            marginLeft: 20 
        } 
    ],
    placeholder: {
        fontFamily: 'Aleo-Light', 
        fontSize: 18 
    },
    textInput: { 
        fontFamily: 'Aleo-Regular', 
        fontSize: 18, 
        color: colors.primaryBlue 
    },
    buttonContainer: { 
        flex: 2, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
};

const MapStateToProps = state => {
    const { amount, address } = state.ethTx;
    const { balance } = state.ethCommon;
    const { gasPrice, currentPriceETH } = state.marketData
    return {
        amount,
        address,
        balance,
        gasPrice,
        currentPriceETH,
    };
}

const mapDispatchtoProps = dispatch => ({
    initiateTxSend: () => {
        dispatch(initiateTxSend())},

    setAmountInReduxState: amount => {
        dispatch(setAmountInReduxState(amount))},

    setAddressInReduxState: address => {
        dispatch(setAddressInReduxState(address))},
});

export default connect(MapStateToProps, mapDispatchtoProps)(SendEthForm);
