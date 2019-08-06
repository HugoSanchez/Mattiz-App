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
            balance,
            gasPrice,
            transactionFee,
            currentPriceETH,
            ethBallanceInDollars,
            setAmountInReduxState,
            setAddressInReduxState
        } = this.props;

        return (
            <View style={[container ]}>
                <View style={cardContainer}>
                    <View style={cardStyle} elevated={amountElevated}>
                        <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                            <Text style={ titleContainer }>
                                USD 
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                            <View style={{ flex: 1 }}>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Input 
                                    placeholder="0"
                                    inputContainerStyle={amountInputContainer}
                                    placeholderTextColor='#040026'
                                    value={ amount } 
                                    secureTextEntry={false}
                                    onFocus={ () => this.setState({ amountElevated: true })}
                                    onEndEditing={ () => this.setState({ amountElevated: false })}
                                    onChangeText={ value => setAmountInReduxState(value)}
                                    inputStyle={{ fontFamily: 'Aleo-Regular', fontSize: 42, color: colors.primaryBlue }}
                                />
                            </View>
                        
                            <View style={{ flex: 1 }}>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={cardContainer}>
                    <View style={cardStyle} elevated={toElevated}>
                        <View style={{ flex: 1.5}}>
                            <Text style={ titleContainer }>
                                Address: 
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                            <View style={{ flex: 1 }}>
                            </View>

                            <View style={{ flex: 1, paddingRight: '20%' }}>
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
                        
                            <View style={{ flex: 1 }}>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 16, alignSelf: 'stretch', margin: '5%'}}>

                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={ styles.smallNumberStyle }>1</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={ styles.smallNumberStyle }>2</Text>
                        </View>
                                
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={ styles.smallNumberStyle }>3</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={ styles.smallNumberStyle }>4</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={ styles.smallNumberStyle }>5</Text>
                        </View>
                    
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={ styles.smallNumberStyle }>6</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={ styles.smallNumberStyle }>7</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={ styles.smallNumberStyle }>8</Text>
                        </View>
                    
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={ styles.smallNumberStyle }>9</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={ styles.smallNumberStyle }>0</Text>
                        </View>
                    
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        </View>
                    </View>

                </View>

                <View style={ feeAndBalanceContainer }>
                    <View style={ feeBox }>
                        <Text style={ titleContainer }>
                            Fee:  
                                <Text style={ feeAndBalanceNumbers }>
                                    { amount > 0 ? '   $' + transactionFee : '   $' + 0.000 }
                                </Text>
                        </Text>
                    </View>

                    <View style={ balanceBox }>
                        <Text style={ balanceTitle }>
                            Balance:  
                                <Text style={ feeAndBalanceNumbers }>
                                {   
                                    // This is ugly AF, but don't know better so far.
                                    amount > 0 ?
                                    '   $' 
                                    + 
                                    parseFloat((balance * currentPriceETH) 
                                    - ((amount * currentPriceETH ) 
                                    + gasPrice * currentPriceETH * 21000))
                                    .toFixed(2) 
                                    :
                                    '   $' 
                                    + parseFloat(balance * currentPriceETH).toFixed(2)
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
        flex: 10, 
        alignSelf: 'stretch' 
    },
    cardContainer: { 
        flex: 6, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    cardStyle: { 
        flex: 1, 
        alignSelf: 'stretch',
        alignItems: 'center' 
    },
    titleContainer: [ 
        styles.extraSmallLightTitle, {
            marginLeft: 0
        } 
    ],
    amountInputContainer: {
        borderBottomColor: 'transparent',
        marginLeft: '35%', 
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
    const { balance, ethBallanceInDollars } = state.ethCommon;
    const { gasPrice, transactionFee, currentPriceETH } = state.marketData
    return {
        amount,
        address,
        balance,
        ethBallanceInDollars,
        transactionFee,
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
