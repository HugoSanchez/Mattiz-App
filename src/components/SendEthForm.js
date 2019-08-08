import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';

import CustomCard from './common/CustomCard';
import PalmButton from './common/PalmButton';
import FeeAndBalanceCard from './common/FeeAndBalanceCard';
import NumbersKeyboard from './common/NumbersKeyboard';

import {
    initiateTxSend,
    setAddressInReduxState,
    initiateSetAmountInReduxState,
} from '../actions'

import colors from '../constants/colors';
import styles from '../styles';

// Dims. 
const width =  Dimensions.get('window').width
class SendEthForm extends Component {

    render() {
        const {
            container,
            cardContainer,
            cardStyle,
            titleContainer,
            textInput,
            placeholder,
            addressInputContainer,
            buttonContainer,
        } = compStyles;

        const {
            address,
            amountInEth,
            amountInDollars,
            transactionFee,
            remainingBalance,
            ethBallanceInDollars,
            setAddressInReduxState
        } = this.props;

        const remainingBalanceAfterFees = parseFloat(remainingBalance - transactionFee).toFixed(2)

        return (
            <View style={ container }>
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
                                { amountInEth + ' Eth'} 
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

                <FeeAndBalanceCard
                    fee={ amountInEth > 0 ? transactionFee : 0.000 }
                    balance={ amountInDollars > 0 ? remainingBalanceAfterFees : ethBallanceInDollars }
                />

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
                    <View style={{ flex: 1, alignSelf: 'stretch' }}>

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
    addressInputContainer: { 
        borderBottomColor: 'transparent', 
        marginTop: 5 
    },
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
    const { transactionFee } = state.marketData;
    const { ethBallanceInDollars } = state.ethCommon;
    const { amountInEth, amountInDollars, address, remainingBalance } = state.ethTx;
    
    return {
        address,
        amountInEth,
        amountInDollars,
        ethBallanceInDollars,
        remainingBalance,
        transactionFee
    };
}

const mapDispatchtoProps = dispatch => ({
    initiateTxSend: () => {
        dispatch(initiateTxSend())},

    setAddressInReduxState: address => {
        dispatch(setAddressInReduxState(address))},

    initiateSetAmountInReduxState: amount => {
        dispatch(initiateSetAmountInReduxState(amount))
    }
});

export default connect(MapStateToProps, mapDispatchtoProps)(SendEthForm);
