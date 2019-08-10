import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
import * as Animatable from 'react-native-animatable';

import LoadingScreen from './LoadingScreen';
import SendEthForm from './SendEthForm'
import PalmButton from './common/PalmButton';
import SendReceiveHeader from './common/SendReceiveHeader'


import {
    loadEthBalances,
} from '../actions'

import colors from '../constants/colors';
import styles from '../styles';

// Props:
// @ modalVisible: - Required. Boolean.
// @ onSlideClose: - Required. Function.
// @ onModalClose: - Required. Function
class SendAndReceiveEth extends Component {

    state = {
        isSendSelected: true,
    }

    componentWillMount() {
        this.props.loadEthBalances()
    }

    render() {

        const { 
            isSendSelected 
        } = this.state

        const {
            qrCodeContainer,
            nameTag
        } = compStyles;

        const {
            loading,
            confirmed
        } = this.props

        if ( loading ) {
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

        if ( confirmed ) {
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

        if ( !loading && !confirmed && !isSendSelected ) {
            return (
                <View style={[ styles.container, { paddingBottom: '15%'} ]}>
                    <SendReceiveHeader
                        isSendSelected={ isSendSelected }
                        onRequestClose={ this.props.onRequestClose }
                        onSendPress={ () => this.setState({ isSendSelected: true })} 
                        onReceivePress={ () => this.setState({ isSendSelected: false })}
                    />
                    <View style={ qrCodeContainer }>
                        <QRCode
                            value={this.props.userAddress}
                            size={180}
                            bgColor='#040026'
                            fgColor='white'/>
                    </View>

                    <View style={ nameTag }>
                        <Text style={ styles.extraSmallTitle }>
                            Pepito.Mattiz.eth
                        </Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={ styles.container }>
                <SendReceiveHeader
                    isSendSelected={ isSendSelected }
                    onRequestClose={ this.props.onRequestClose }
                    onSendPress={ () => this.setState({ isSendSelected: true })} 
                    onReceivePress={ () => this.setState({ isSendSelected: false })}
                />
                <SendEthForm />
            </View>
        )
    }
}

const compStyles = {
    qrCodeContainer: { 
        flex: 6, 
        alignSelf: 'stretch', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: '5%' 
    },
    nameTag: { 
        flex: 1, 
        marginTop: '5%', 
        alignItems: 'center', 
        justifyContent: 'center' 
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
    loadEthBalances: () => dispatch(loadEthBalances()),
});

export default connect(MapStateToProps, mapDispatchtoProps)(SendAndReceiveEth);
