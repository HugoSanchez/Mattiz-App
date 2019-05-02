import React, { Component } from 'react';
import { 
    View, 
    Text,
    Modal,
    TouchableOpacity, 
    ImageBackground, 
    StyleSheet 
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';

// Components 
import MattizButton from '../../components/common/MattizButton';
import CustomCard from '../../components/common/CustomCard';
import LoadingScreen from '../../components/LoadingScreen';

// Actions.
import { 
    setAmountInReduxState, 
    setAddressInReduxState,
    initiateTxSend
} from '../../actions';

// Styles.
import GS from '../../styles';

class SendForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fee: 0,
            amountElevated: false,
            toElevated: false,
            showModal: false,
        }
    }

    async componentWillMount() {
        // 
    }

    async sendTx() {
        // Initiate sendTx logic. 
        this.props.initiateTxSend();
        // And navigate user to loading screen.
        this.props.navigation.navigate('loadingTx')
    }

    render() {
        return (
            <View style={ styles.container }>
            <ImageBackground 
                source={require('../../assets/topLogo.png')} 
                style={{ width:'100%', height:'100%', flex: 1 }}
                resizeMode='cover'
            >

                    <View style={{ flex: 1, marginTop: 100 }}>
                        <View style={{ flex: 10, justifyContent: 'center', backgroundColor: '#FFF', borderRadius: 30 }}>

                            <View style={{ flex: 1.5, flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={{ paddingBottom: 40 }} 
                                        onPress={() => this.setState({ showModal: false })}>
                                        <Icon name='x' size={30} color={'#040026'}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.bigLightTitle, { marginTop: 10, fontWeight: 'bold' }]}>
                                        Send Ether
                                    </Text>
                                    <Text style={[ GS.smallLightNumber, { marginTop: 5 }]}>
                                        { parseFloat(this.props.currentEthPrice * this.props.amount).toFixed(2) }$
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{ paddingTop: 22 }} 
                                        onPress={() => this.setState({ showModal: false })}>
                                        <Icon name='maximize' size={30} color={'#040026'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <CustomCard 
                                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                elevated={this.state.amountElevated}
                            >
                                <View style={{ flex: 3 }}>
                                    <Text style={[ GS.smallLightTitle, { marginLeft: 20 } ]}>
                                        Amount: 
                                    </Text>
                                </View>
                                <View style={{ flex: 1.5 }}>
                                    <Input 
                                        placeholder="0.000"
                                        inputContainerStyle={{ borderBottomColor: 'transparent', marginRight: 45, marginTop: 5 }}
                                        placeholderTextColor='#040026'
                                        value={this.props.amount}
                                        secureTextEntry={false}
                                        onFocus={ () => this.setState({ amountElevated: true })}
                                        onEndEditing={ () => this.setState({ amountElevated: false })}
                                        onChangeText={ value => this.props.setAmountInReduxState(value)}
                                    />
                                </View>
                            </CustomCard>

                            <CustomCard 
                                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                elevated={this.state.toElevated}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[ GS.smallLightTitle, { marginLeft: 20 } ]}>
                                        To: 
                                    </Text>
                                </View>
                                <View style={{ flex: 4 }}>
                                    <Input 
                                        placeholder="0x ..."
                                        inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                                        placeholderTextColor='#040026'
                                        value={null}
                                        secureTextEntry={false}
                                        onFocus={ () => this.setState({ toElevated: true })}
                                        onEndEditing={ () => this.setState({ toElevated: false })}
                                        onChangeText={ value => this.props.setAddressInReduxState(value) }
                                        style={ styles.input }
                                    />
                                </View>
                                <View style={{ flex: 0.8 }}>
                                </View>
                            </CustomCard>

                            <View style={{ flex: 1, flexDirection: 'row',  alignItems: 'center' }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={[ GS.smallLightTitle, { marginLeft: 20 } ]}>
                                        Your Balance:  
                                    </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', marginRight:  28 }}>
                                    <Text style={[ GS.extraSmallBoldNumber, {alignSelf: 'flex-start'}]}>
                                        {   
                                            parseFloat((this.props.balance * this.props.currentEthPrice) - (this.props.amount * this.props.currentEthPrice )).toFixed(2)
                                        }$
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row',  alignItems: 'center' }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={[ GS.smallLightTitle, { marginLeft: 20 } ]}>
                                        Fee:  
                                    </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[ GS.extraSmallBoldNumber, {alignSelf: 'flex-end', marginTop: 15 }]}>
                                            {   
                                                /** 
                                                this.state.fee < 0.0001 ? 
                                                '0.0000'
                                                :
                                                parseFloat(this.state.fee).toFixed(2)
                                                */
                                            }0.0000
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={[ GS.extraSmallLightNumber, {alignSelf: 'flex-end'}]}>
                                            {   
                                                parseFloat(this.props.gasPrice).toFixed(4)
                                            }
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[ GS.extraSmallBoldNumber, { marginTop: 15 } ]}>
                                            $
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={ GS.extraSmallLightNumber}>
                                            Eth
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row',  alignItems: 'center'  }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={[ GS.smallLightTitle, { marginLeft: 20 } ]}>
                                        Total:  
                                    </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[ GS.extraSmallBoldNumber, {alignSelf: 'flex-end', marginTop: 15 }]}>
                                            {
                                                parseFloat(this.props.amount * this.props.currentEthPrice).toFixed(2)
                                            }
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={[ GS.extraSmallLightNumber, {alignSelf: 'flex-end'}]}>
                                            {
                                                parseFloat(this.props.amount + this.props.gasPrice).toFixed(4)
                                            }
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[ GS.extraSmallBoldNumber, { marginTop: 15 } ]}>
                                            $
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={ GS.extraSmallLightNumber}>
                                            Eth
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flex: 2, flexDirection: 'column' }}>                                 
                            </View>

                            <View style={{ flex: 2, justifyContent: 'center'}}>
                                <MattizButton
                                    title={'Send'}
                                    onPress={() => this.props.initiateTxSend() } 
                                />
                            </View>
                        </View>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={false}
                        onRequestClose={() => null}>

                        <View style={{ flex: 1 }}>

                            <View style={{ flex: 4 }}>
                            </View>

                            <View style={{ flex: 10, justifyContent: 'center', backgroundColor: '#FFF', borderRadius: 30 }}>
                                <View style={{ marginTop: 10 }}>                  
                                    <LoadingScreen>
                                        {
                                            // console.log('EP: ', this.props.historicEthPrice)
                                        }
                                        <Text> Sending Transaction.. </Text>
                                    </LoadingScreen>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View> 
            </ImageBackground>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    viewStyle: {
        marginTop: 200,
        marginBottom: 40,
    },
    input: {
        height: 50,
        backgroundColor: '#ededed',
        margin: 5,
        padding: 20
    },
    textStyle: {
        fontFamily: 'Raleway-Light',
        fontSize: 14
    },
})

const MapStateToProps = state => {
    const { amount, address } = state.ethTx;
    const { balance } = state.ethCommon;
    const { gasPrice, currentEthPrice } = state.marketData
    return {
        amount,
        address,
        balance,
        gasPrice,
        currentEthPrice,
    };
}

const mapDispatchtoProps = dispatch => ({
    setAmountInReduxState: amount => dispatch(setAmountInReduxState(amount)),
    setAddressInReduxState: address => dispatch(setAddressInReduxState(address)),
    initiateTxSend: () => dispatch(initiateTxSend())
});

export default connect(MapStateToProps, mapDispatchtoProps)(SendForm);