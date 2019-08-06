import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Modal,
    Dimensions, 
    TouchableOpacity 
} from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
import * as Animatable from 'react-native-animatable';

import CustomCard from '../components/common/CustomCard';
import PalmButton from '../components/common/PalmButton';
import LoadingScreen from '../components/LoadingScreen';

import {
    setAmountInReduxState,
    setAddressInReduxState,
    initiateTxSend,
    loadEthBalances,
    resetIntitialState
} from '../actions'

import colors from '../constants/colors';
import styles from '../styles';

// Number parser 
const numeral = require('numeral');

// Dims
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

// Props:
// @ modalVisible: - Required. Boolean.
// @ onSlideClose: - Required. Function.
// @ onModalClose: - Required. Function
class SendFormModal extends Component {

    state = {
        send: true,
        renderForm: true,
        renderQr: false,
        amountElevated: null,
        toElevated: null
    }

    componentWillMount() {
        this.props.loadEthBalances()
    }

    render() {

        console.log('Balance: ', this.props.balance) 
        console.log('currentPriceETH: ', this.props.currentPriceETH) 
        console.log('amount: ', this.props.amount) 
        console.log('gasPrice: ', this.props.gasPrice) 

        const { send } = this.state

        const {
            extraSmallMediumTitle,
            extraSmallLightTitle
        } = styles;

        const {
            loading,
            confirmed
        } = this.props

        if ( this.props.loading ) {
            return (
                <View style={[ styles.container, { paddingBottom: '25%'} ]}>
                    <LoadingScreen  size={50}>
                        <Text style={compStyles.messageText}>
                            Sending transaction ... 
                        </Text>
                    </LoadingScreen>
                </View>
            );
        }

        if ( this.props.confirmed ) {
            return (
                <View style={[ styles.container, { paddingBottom: '15%'} ]}>
                    <Animatable.View 
                        animation="fadeIn" 
                        easing="ease-out" 
                        iterationCount={1}
                        style={styles.container}
                    >
                        <PalmButton 
                            iconName={'check'}
                            onPress={() => this.props.onModalClose()}
                            title={'Transaction Confirmed! '}
                            titleStyle={{ fontFamily: 'Raleway-Regular'}}
                        />
                    </Animatable.View>
                </View>
            );
        }

        if ( !loading && !confirmed && this.state.renderQr ) {
            return (
                <View style={[ styles.container, { paddingBottom: '15%'} ]}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={ send ? { borderBottomWidth: 1, borderColor: colors.primaryBlue } : null} 
                                onPress={() => this.setState({ send: true, renderForm: true, renderQr: false })}> 
                                <Text style={ send ? extraSmallMediumTitle : extraSmallLightTitle }>
                                    Send 
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity 
                                style={ !send ? { borderBottomWidth: 1, borderColor: colors.primaryBlue } : null}
                                onPress={() => this.setState({ send: false, renderForm: false, renderQr: true })}>
                                <Text style={ !send ? extraSmallMediumTitle : extraSmallLightTitle }>
                                    Receive 
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 6, alignSelf: 'stretch' }}>
                        <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                        <QRCode
                            value={this.props.userAddress}
                            size={180}
                            bgColor='#040026'
                            fgColor='white'/>
                        </View>

                        <View style={{ flex: 1, marginTop: '5%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={ styles.extraSmallTitle }>
                                Pepito.Mattiz.eth
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <View style={[ styles.container, { paddingBottom: '15%'} ]}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={ send ? { borderBottomWidth: 1, borderColor: colors.primaryBlue } : null} 
                            onPress={() => this.setState({ send: true, renderForm: true, renderQr: false })}> 
                            <Text style={ send ? extraSmallMediumTitle : extraSmallLightTitle }>
                                Send 
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity 
                            style={ !send ? { borderBottomWidth: 1, borderColor: colors.primaryBlue } : null}
                            onPress={() => this.setState({ send: false, renderForm: false, renderQr: true })}>
                            <Text style={ !send ? extraSmallMediumTitle : extraSmallLightTitle }>
                                Receive 
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 6, alignSelf: 'stretch' }}>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <CustomCard 
                            style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                            elevated={this.state.amountElevated}>
                            <View style={{ flex: 3 }}>
                                <Text style={[ styles.extraSmallLightTitle, { marginLeft: 20 } ]}>
                                    Amount: 
                                </Text>
                            </View>
                            <View style={{ flex: 1.5 }}>
                                <Input 
                                    placeholder="0.000"
                                    inputContainerStyle={{ borderBottomColor: 'transparent', marginRight: 45, marginTop: 5 }}
                                    placeholderTextColor='#040026'
                                    value={ this.props.amount } //this.props.amount
                                    secureTextEntry={false}
                                    onFocus={ () => this.setState({ amountElevated: true })}
                                    onEndEditing={ () => this.setState({ amountElevated: false })}
                                    onChangeText={ value => this.props.setAmountInReduxState(value)}
                                    inputStyle={ this.state.username ? compStyles.textInput : compStyles.placeholder }
                                />
                            </View>
                        </CustomCard>
                    </View>

                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <CustomCard 
                            style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                            elevated={this.state.toElevated}>
                            <View style={{ flex: 1 }}>
                                <Text style={[ styles.extraSmallLightTitle, { marginLeft: 20 } ]}>
                                    Address: 
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Input 
                                    placeholder="0x ..."
                                    inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                                    placeholderTextColor='#040026'
                                    value={null}
                                    secureTextEntry={false}
                                    onFocus={ () => this.setState({ toElevated: true })}
                                    onEndEditing={ () => this.setState({ toElevated: false })}
                                    onChangeText={ value => this.props.setAddressInReduxState(value) }
                                    inputStyle={ this.state.username ? compStyles.textInput : compStyles.placeholder }
                                />
                            </View>
                        </CustomCard>
                    </View>

                    <View style={{ flex: 2, flexDirection: 'row', margin: '2%' }}>
                        <View style={{ flex: 1, flexDirection: 'row',  alignItems: 'center' }}>
                            <Text style={[ styles.extraSmallLightTitle, { marginLeft: 20 } ]}>
                                Fee:  
                                    <Text style={[ styles.extraSmallRegularNumber, { marginLeft: 20 } ]}>
                                        {   
                                            this.props.amount > 0 ?
                                            '   $' +
                                            parseFloat( this.props.gasPrice * this.props.currentPriceETH * 21000 ).toFixed(3)
                                            :
                                            '   ' + 0.0000
                                        }
                                    </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 1.5, flexDirection: 'row',  alignItems: 'center' }}>
                            <Text style={[ styles.extraSmallLightTitle, { marginLeft: 35 } ]}>
                                Balance:  
                                    <Text style={[ styles.extraSmallRegularNumber, { marginLeft: 20 } ]}>
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

                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <PalmButton 
                            iconName={'check-circle'}
                            onPress={() => this.props.initiateTxSend()}
                            title={'Send Transaction!'}
                            titleStyle={{ fontFamily: 'Raleway-Regular'}}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const compStyles = {
    placeholder: {
        fontFamily: 'Aleo-Light', 
        fontSize: 18 
    },
    textInput: { 
        fontFamily: 'Aleo-Regular', 
        fontSize: 18, 
        color: colors.primaryBlue 
    },
    messageText: {
        color: colors.primaryBlue, 
        fontFamily: 'Raleway-LightItalic',
        fontSize: 18,
        marginTop: '5%'
    }
};

const MapStateToProps = state => {
    const { amount, address, loading, confirmed } = state.ethTx;
    const { userAddress, balance } = state.ethCommon;
    const { gasPrice, currentPriceETH } = state.marketData
    return {
        amount,
        address,
        loading,
        confirmed,
        userAddress,
        balance,
        gasPrice,
        currentPriceETH,
    };
}

const mapDispatchtoProps = dispatch => ({
    setAmountInReduxState: amount => dispatch(setAmountInReduxState(amount)),
    setAddressInReduxState: address => dispatch(setAddressInReduxState(address)),
    initiateTxSend: () => dispatch(initiateTxSend()),
    resetIntitialState: () => dispatch(resetIntitialState()),
    loadEthBalances: () => dispatch(loadEthBalances()),
});

export default connect(MapStateToProps, mapDispatchtoProps)(SendFormModal);
