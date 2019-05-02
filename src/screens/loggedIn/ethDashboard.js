import React, { Component } from 'react';
import { 
    View, 
    Text,
    Modal, 
    TouchableOpacity, 
    StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import axios from 'axios';

// Crypto imports
import 'ethers/dist/shims.js'; 
import { ethers } from 'ethers';
import { config } from '../../../node_modules/config';

import { getMarketData } from '../../api/auth';

// Components.
import MattizButton from '../../components/common/MattizButton';
import CustomCard  from '../../components/common/CustomCard';
import SimpleLineChart from '../../components/charts/SimpleLineChart';
import SimpleBarChart from '../../components/charts/SimpleBarChart';
import LoadingScreen from '../../components/LoadingScreen';

// Redux actions.
import { 
    setAmountInReduxState, 
    setAddressInReduxState,
    setGasPrice,
    showForm,
    initiateTxSend 
} from '../../actions';

// Styles.
import GS from '../../styles';

class ethDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            price: 0,
            gasPrice: 0,
            fee: 0,
            balance: 0,
            amountElevated: false,
            toElevated: false,
            showModal: false,
            showSecondModal: false,
        }
    }

    async componentWillMount() {
        let Provider = new ethers.providers.JsonRpcProvider(config.infuraUrl)
        let gasPrice = await Provider.getGasPrice();
        let GP = ethers.utils.formatEther(ethers.utils.bigNumberify(gasPrice * 1.5).toString()) * 21000
        this.props.setGasPrice(gasPrice)

        let wallet = ethers.Wallet.fromMnemonic(config.seed);
        console.log('wallet: ', wallet)
        
        let wallet2 = new ethers.Wallet(wallet.privateKey, Provider);
        let balancePromise = wallet2.getBalance();
        balancePromise.then((balance) => {
            console.log('Balance: ', ethers.utils.formatEther(ethers.utils.bigNumberify(balance).toString()))
            this.setState({balance: ethers.utils.formatEther(ethers.utils.bigNumberify(balance).toString())});
        });

        getMarketData()
            .then(response => { 
                console.log('data: ', response.data)
                this.setState({ data: response.data.rates, gasPrice: GP}) 
            })

        axios.get('https://api.cryptonator.com/api/ticker/eth-usd')
            .then( res => {
                console.log(res.data)
                this.setState({price: parseInt(res.data.ticker.price), fee: (res.data.ticker.price * GP )}) })
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomCard style={styles.balanceBoxContainer} elevated={false}>
                    <TouchableOpacity
                        style={{ marginLeft: 15, marginTop: 25, alignSelf: 'flex-start' }}
                        onPress={() => this.props.navigation.navigate('Dashboard')} 
                    >
                        <Icon name='arrow-left' size={25} color={'#000'}/>
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'stretch', alignItems: 'center', marginTop: 27 }}>              
                        
                        <SimpleLineChart  data={this.state.data} price={this.state.price}>
                            <View style={{ alignItems: 'center'}}>
                                <Text style={ GS.bigBoldNumber}>
                                {
                                    parseInt(this.state.price).toFixed(2)
                                }$
                                </Text>
                                <Text style={styles.textStyle}> Your ETH Balance </Text>
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 10}}>
                                <Text style={[ GS.extraSmallBoldNumber ]}>
                                {
                                    parseInt(this.state.price).toFixed(2)
                                }$ 
                                </Text> 
                                <Text style={styles.textStyle}>Current Eth Price</Text>
                            </View>
                        </SimpleLineChart>
                    </View>
                </CustomCard>

                <View style={[styles.boxContainer, styles.splitBox ]}>
                    <CustomCard style={styles.smalleBoxContainer} elevated={true}>
                        <TouchableOpacity
                            onPress={() => this.props.showForm()} 
                        >
                            <Text style={[styles.textStyle, { fontSize: 18 }]}>
                                Send 
                            </Text>
                        </TouchableOpacity>
                    </CustomCard>

                    <CustomCard style={styles.smalleBoxContainer} elevated={true}>
                        <Text style={[styles.textStyle, { fontSize: 18 }]}> 
                            Receive 
                        </Text>
                    </CustomCard>
                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

                </View>

                <View style={styles.boxContainer}>

                </View>

                
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.props.showSendForm}
                    onRequestClose={() => null}>

                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>

                        <View style={{ flex: 4 }}>
                        </View>

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
                                        { parseFloat(this.state.price * this.props.amount).toFixed(2) }$
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
                                            parseFloat((this.state.balance * this.state.price) - (this.props.amount * this.state.price + this.state.fee)).toFixed(2)
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
                                                this.state.fee < 0.0001 ? 
                                                '0.0000'
                                                :
                                                parseFloat(this.state.fee).toFixed(2)
                                            }
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={[ GS.extraSmallLightNumber, {alignSelf: 'flex-end'}]}>
                                            {   
                                                parseFloat(this.state.gasPrice).toFixed(4)
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
                                                parseFloat(this.props.amount * this.state.price + this.state.fee).toFixed(2)
                                            }
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={[ GS.extraSmallLightNumber, {alignSelf: 'flex-end'}]}>
                                            {
                                                parseFloat(this.props.amount + this.state.gasPrice).toFixed(4)
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

                            <View style={{ flex: 2, justifyContent: 'center'}}>
                                <MattizButton
                                    title={'Send'}
                                    onPress={() => this.props.initiateTxSend() } 
                                />
                            </View>
                        </View>
                    </View>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.props.loading}
                        onRequestClose={() => null}>

                        <View style={{ flex: 1 }}>

                            <View style={{ flex: 4 }}>
                            </View>

                            <View style={{ flex: 10, justifyContent: 'center', backgroundColor: '#FFF', borderRadius: 30 }}>
                                <View style={{ marginTop: 10 }}>                  
                                    <LoadingScreen>
                                        {
                                            console.log('loading: ', this.props.showSendForm)
                                        }
                                        <Text> Sending Transaction.. </Text>
                                    </LoadingScreen>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Modal>
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
    balanceBoxContainer: {
        flex: 4,
        marginTop: 0, 
        marginLeft: 0,
        marginRight: 0,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#E5F2D4',
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 2,
        borderColor: '#E5F2D4',
    },
    splitBox: {
        flexDirection: 'row'
    },
    smalleBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    statusAvatar: {
        width: 20,
        height: 20, 
        borderRadius: 10,
        backgroundColor: '#E5F2D4',
        marginLeft: 16
    },
    textStyle: {
        fontFamily: 'Raleway-Light',
        fontSize: 14
    }
})

const MapStateToProps = state => {
    const { amount, address, loading, showSendForm } = state.ethTx;
    return {
        amount,
        address,
        loading,
        showSendForm,
    };
}

const mapDispatchToProps = dispatch => ({
    setAmountInReduxState: amount => dispatch(setAmountInReduxState(amount)),
    setAddressInReduxState: address => dispatch(setAddressInReduxState(address)),
    setGasPrice: price => dispatch(setGasPrice(price)),
    showForm: () => dispatch(showForm()),
    initiateTxSend: () => dispatch(initiateTxSend())
});

export default connect(MapStateToProps, mapDispatchToProps)(withNavigationFocus(ethDashboard));
