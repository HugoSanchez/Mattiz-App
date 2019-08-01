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

import CustomCard from '../components/common/CustomCard';
import PalmButton from '../components/common/PalmButton';

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

        const { send } = this.state

        const {
            extraSmallMediumTitle,
            extraSmallLightTitle
        } = styles;

        return (
            <Modal animationType="slide" transparent={true} visible={this.props.modalVisible}>
                <View style={ compStyles.container }>

                    <View style={ compStyles.topContainer }>
                    </View>
                    <View style={ compStyles.formContainer }>

                        <View style={ compStyles.closeContainer }>
                            <TouchableOpacity 
                                onPress={ this.props.onSlideClose }
                                style={ compStyles.closeSlider }>
                            </TouchableOpacity>
                        </View>

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

                        { 
                            this.state.renderForm && 
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
                                                        '   ' +
                                                        parseFloat( this.props.gasPrice * this.props.currentPriceETH * 21000 ).toFixed(3)
                                                        :
                                                        '   ' + 0.0000
                                                    }$
                                                </Text>
                                        </Text>
                                    </View>

                                    <View style={{ flex: 1.5, flexDirection: 'row',  alignItems: 'center' }}>
                                        <Text style={[ styles.extraSmallLightTitle, { marginLeft: 35 } ]}>
                                            Balance:  
                                                <Text style={[ styles.extraSmallRegularNumber, { marginLeft: 20 } ]}>
                                                {   
                                                    '  ' 
                                                    + 
                                                    parseFloat((this.props.balance * this.props.currentPriceETH) 
                                                    - (this.props.amount * this.props.currentPriceETH )).toFixed(2)
                                                }$
                                            </Text>
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <PalmButton 
                                        iconName={'check-circle'}
                                        onPress={() => this.onButtonPress()}
                                        title={'Send Transaction!'}
                                        titleStyle={{ fontFamily: 'Raleway-Regular'}}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>

                                </View>
                            </View>
                        }

                        { 
                            this.state.renderQr && 
                            <View style={{ flex: 6, alignSelf: 'stretch' }}>
                                <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                                <QRCode
                                    value={'Pepito.mattiz.eth'}
                                    size={200}
                                    bgColor='#040026'
                                    fgColor='white'/>
                                </View>

                                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={ styles.extraSmallTitle }>
                                        Pepito.Mattiz.eth
                                    </Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}

const compStyles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    topContainer: {
        height: height * 0.59,
        width: width,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    formContainer: {
        height: height * 0.41,
        width: width, 
        backgroundColor: '#FFF', 
        borderRadius: 25
    },
    closeContainer: { 
        flex: 0.5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    closeSlider: { 
        width: width * 0.10, 
        borderRadius: 25,
        borderWidth: 2, 
        borderColor: 'lightgray'
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
};

const MapStateToProps = state => {
    const { amount, address, loading, confirmed } = state.ethTx;
    const { balance } = state.ethCommon;
    const { gasPrice, currentPriceETH } = state.marketData
    return {
        amount,
        address,
        loading,
        confirmed,
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
