import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import PalmButton from './common/PalmButton';
import AddressInput from './common/AddressInput';
import FeeAndBalanceCard from './common/FeeAndBalanceCard';
import NumbersKeyboard from './common/NumbersKeyboard';
import SendModalAmountHeader from './common/SendModalAmountHeader';

import {
    initiateTxSend,
    setAddressInReduxState,
    initiateSetAmountInReduxState,
} from '../actions'

class SendEthForm extends Component {

    render() {
        const {
            container,
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

                <SendModalAmountHeader
                    mainCurrency={'USD'}
                    onPressMax={() => null} // To do. 
                    amount={amountInDollars}
                    subCurrencyAmount={amountInEth}
                    subDenomination={' Eth'}
                />

                <AddressInput
                    flex={3} 
                    address={ address }
                    placeholder={' 0x ...'}
                    onChangeText={value => setAddressInReduxState(value)}
                />

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
