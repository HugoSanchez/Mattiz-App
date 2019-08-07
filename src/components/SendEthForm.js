import React, { Component } from 'react';
import {  View, Text, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
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

// Dims. 
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

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
                                <Text style={{ fontFamily: 'Aleo-Regular', fontSize: 46, color: colors.primaryBlue }}>
                                    0
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
                    <View style={cardStyle} elevated={toElevated}>
                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'flex-start', marginTop: '2%' }}>
                            <Text style={ styles.extraSmallLightNumber }>0.004 Eth</Text>
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
                                    onFocus={ () => this.setState({ toElevated: true })}
                                    onEndEditing={ () => this.setState({ toElevated: false })}
                                    onChangeText={ value => setAddressInReduxState(value) }
                                    inputStyle={ address > 0 ? textInput : placeholder  }
                                />
                            </CustomCard>
                        </View>
                    </View>    
                </View>

                <View style={{ flex: 20, alignSelf: 'stretch', margin: '5%'}}>

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
                        <Text style={ styles.smallNumberStyle }>,</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={ styles.smallNumberStyle }>0</Text>
                        </View>
                    
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Icon 
                                name={'delete'}
                                size={20} 
                                color={colors.primaryBlue}
                            />
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
                    {
                    false ?
                    <PalmButton 
                        iconName={'check-circle'}
                        onPress={() => this.props.initiateTxSend()}
                        title={'Send Transaction!'}
                        titleStyle={{ fontFamily: 'Raleway-Regular'}}
                    />
                    :
                    null
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
