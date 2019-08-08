import React, { Component } from 'react';
import {  View, Text, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';

import CustomCard from './common/CustomCard';
import PalmButton from './common/PalmButton';

import {
    initiateTxSend,
    setAmountInReduxState,
    setAddressInReduxState,
    setAmountInDollarsInReduxState,
    initiateSetAmountInReduxState,
} from '../actions'

import colors from '../constants/colors';
import styles from '../styles';
import NumbersKeyboard from './common/NumbersKeyboard';

// Dims. 
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

// Number parser 
const numeral = require('numeral');

class SendEthForm extends Component {

    render() {
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
            amountInDollars,
            ethBallanceInDollars,
            setAddressInReduxState
        } = this.props;

        let amountInEth = numeral(amountInDollars / currentPriceETH ).format('0.0,000')
        let currentBalance = numeral(balance * currentPriceETH).format('0,0.00') 
        let remainingBalance = numeral(currentBalance - (amountInDollars + transactionFee)).format('0,0.00') 

        return (
            <View style={[container ]}>
                <View style={cardContainer}>
                    <View style={cardStyle}>
                        <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                            <Text style={[ titleContainer, { marginBottom: '2%'} ]}>
                                USD 
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <View style={{ height: width * 0.1, width: width * 0.14, alignItems: 'center', justifyContent: 'center', marginRight: '15%', backgroundColor: '#DDEDF7', borderRadius: 10 }}>
                                    <Text style={ styles.extraSmallTitle }>max</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ 
                                    fontFamily: 'Aleo-Regular',
                                    alignSelf: 'center', 
                                    fontSize: amountInDollars.length > 5 ? 38 : 46, 
                                    color: colors.primaryBlue }}>
                                    { amountInDollars }
                                </Text>
                            </View>
                        
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ height: width * 0.1, width: width * 0.14, alignItems: 'center', justifyContent: 'center', marginLeft: '15%', backgroundColor: '#DDEDF7', borderRadius: 10 }}>
                                    <Icon 
                                        name='refresh-cw' 
                                        size={20} 
                                        style={{ transform: [{ rotate: '90deg'}] }} 
                                        color={colors.primaryBlue}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 8, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={cardStyle}>
                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'flex-start', marginTop: '2%' }}>
                            <Text style={ styles.extraSmallLightNumber }>
                                { amount + ' Eth'} 
                            </Text>
                        </View>
                        
                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                            <CustomCard 
                                elevated={true}
                                style={{ width: width * 0.7, height: '100%', alignSelf: 'center', borderRadius: 10 }}>
                                <Input 
                                    placeholder="0x ..."
                                    inputContainerStyle={ addressInputContainer }
                                    placeholderTextColor='#040026'
                                    value={ address }
                                    secureTextEntry={false}
                                    onChangeText={ value => setAddressInReduxState(value) }
                                    inputStyle={ address > 0 ? textInput : placeholder  }
                                />
                            </CustomCard>
                        </View>
                    </View>    
                </View>

                <NumbersKeyboard 
                    flex={20}
                    onPressOne=    {() => this.props.initiateSetAmountInReduxState('1')}
                    onPressTwo=    {() => this.props.initiateSetAmountInReduxState('2')}
                    onPressThree=  {() => this.props.initiateSetAmountInReduxState('3')}
                    onPressFour=   {() => this.props.initiateSetAmountInReduxState('4')}
                    onPressFive=   {() => this.props.initiateSetAmountInReduxState('5')}
                    onPressSix=    {() => this.props.initiateSetAmountInReduxState('6')}
                    onPressSeven=  {() => this.props.initiateSetAmountInReduxState('7')}
                    onPressEight=  {() => this.props.initiateSetAmountInReduxState('8')}
                    onPressNine=   {() => this.props.initiateSetAmountInReduxState('9')}
                    onPressZero=   {() => this.props.initiateSetAmountInReduxState('0')}
                    onPressComa=   {() => this.props.initiateSetAmountInReduxState('.')}
                    onPressDelete= {() => this.props.initiateSetAmountInReduxState('delete')}
                />

                <View style={ feeAndBalanceContainer }>
                    <View style={ feeBox }>
                        <Text style={ titleContainer }>
                            Fee:  
                                <Text style={ feeAndBalanceNumbers }>
                                    { amountInEth > 0 ? '   $' + transactionFee : '   $' + 0.000 }
                                </Text>
                        </Text>
                    </View>

                    <View style={ balanceBox }>
                        <Text style={ balanceTitle }>
                            Balance:  
                                <Text style={ feeAndBalanceNumbers }>
                                {   
                                    amountInDollars > 0 
                                    ? '   $' + remainingBalance 
                                    : '   $'  + currentBalance 
                                }
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={ buttonContainer }>
                    {
                    false ?
                    <PalmButton 
                        iconName={'check-circle'}
                        onPress={() => this.props.initiateTxSend()}
                        title={'Send Transaction!'}
                        titleStyle={{ fontFamily: 'Raleway-Regular'}}
                    />
                    :
                    <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1, borderColor: 'black'}}>

                    </View>
                    }
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
        marginLeft: '7%',
        marginRight: '7%'
    },
    feeBox: { 
        flex: 1, 
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'center'
    },
    balanceBox: { 
        flex: 1.5, 
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'center'
    },
    balanceTitle: [ 
        styles.extraSmallLightTitle, { 
            marginLeft: 25 
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
        flex: 8, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
};

const MapStateToProps = state => {
    const { amount, amountInDollars, address } = state.ethTx;
    const { balance, ethBallanceInDollars } = state.ethCommon;
    const { gasPrice, transactionFee, currentPriceETH } = state.marketData
    return {
        amount,
        address,
        balance,
        amountInDollars,
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

    setAmountInDollarsInReduxState: amount => {
        dispatch(setAmountInDollarsInReduxState(amount))
    },

    setAmountInDollarsInReduxState: amount => {
        dispatch(setAmountInDollarsInReduxState(amount))
    },

    initiateSetAmountInReduxState: amount => {
        dispatch(initiateSetAmountInReduxState(amount))
    }
});

export default connect(MapStateToProps, mapDispatchtoProps)(SendEthForm);
