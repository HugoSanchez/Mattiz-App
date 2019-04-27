import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity, 
    ImageBackground, 
    StyleSheet 
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';

import MattizButton from '../../components/common/MattizButton';
import CustomCard from '../../components/common/CustomCard';

// Crypto imports
import 'ethers/dist/shims.js'; // Required 'Shim' for ethers.js to work in React Native.
import { ethers } from 'ethers';

import { config } from '../../../config';
import { 
    setAmountInReduxState, 
    setAddressInReduxState,
    clearTxForm,
} from '../../actions';

let infuraProvider = new ethers.providers.InfuraProvider('mainnet');

class SendForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            wallet: null,
            amount: null,
            address: null
        }
    }

    async componentWillMount() {

        // Future.
        // let wallet = await getTokenFromMemory('wallet')
        // console.log('user: ', this.props.user  0xCc74308838BbAcEEC226611A0C2b3fD5f4a7D8a2

        // Use the same mnemonic to generate a Ethereum Wallet.
        let wallet = ethers.Wallet.fromMnemonic(config.seed);
        console.log(wallet)
        
        let wallet2 = new ethers.Wallet(wallet.privateKey, infuraProvider);
        this.setState({ wallet: wallet2 })

        this.getBalance(wallet2)
    }

    getBalance(wallet) {
        let balancePromise = wallet.getBalance();
        balancePromise.then((balance) => {
            console.log(ethers.utils.formatEther(parseInt(balance._hex).toString()));
            this.setState({balance: ethers.utils.formatEther(parseInt(balance._hex).toString())});
        });
    }

    async sendTx() {

        // First, clear form.
        this.props.clearTxForm();

        // Then initiate sendTx logic. 

        // And navigate user to loading screen.
        this.props.navigation.navigate('loadingTx')


        /** 
        console.log('hit', this.state.wallet.getTransactionCount())
        
        let transaction = {
            nonce: await this.state.wallet.getTransactionCount(),
            gasLimit: 21000,
            gasPrice: ethers.utils.bigNumberify("20000000000"),    
            to: this.state.address,
            value: ethers.utils.parseEther(this.state.amount),
            data: "0x",
            chainId: ethers.utils.getNetwork('homestead').chainId
        }
        
        console.log(transaction)

        this.cleaState()
        
        
        let signPromise = this.state.wallet.sign(transaction)
        signPromise.then((signedTransaction) => {

            console.log(signedTransaction);

            
            let provider = ethers.getDefaultProvider()
            provider.sendTransaction(signedTransaction).then((tx) => {
                
                console.log('Transaction sent');

                let provider = ethers.getDefaultProvider()
                provider.waitForTransaction(tx).then(tx => {
                    console.log('Transaction mined', tx)
                })
            });
        })
        */
    
    }

    render() {
        return (
            <View style={ styles.container }>
            <ImageBackground 
                source={require('../../assets/topLogo.png')} 
                style={{ width:'100%', height:'100%', flex: 1 }}
                resizeMode='cover'
            >

                <CustomCard 
                    style={{ margin: 10, marginTop: 0, height: 300, borderRadius: 10 }}
                    elevated={false}
                    >

                    <TouchableOpacity
                        style={{ marginLeft: 15, marginTop: 10, alignSelf: 'flex-start' }}
                        onPress={() => this.props.navigation.navigate('ethDashboard')} 
                        >
                        <Icon name='arrow-left' size={25} color={'#000'}/>
                    </TouchableOpacity>

                    <Text style={[styles.textStyle, { fontSize: 32, marginTop: 75, marginBottom: 5 }]}>
                        $ {  this.state.balance * 170}
                    </Text>                    
                    <Text style={styles.textStyle}> Your ETH Balance </Text>

                </CustomCard>

                <CustomCard 
                    style={{ margin: 10, marginTop: 10, height: 55, borderRadius: 10 }}
                    elevated={true}
                >
                    <Input 
                        placeholder="Amount"
                        inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                        placeholderTextColor='gray'
                        value={this.props.amount}
                        secureTextEntry={false}
                        onChangeText={ value => this.props.setAmountInReduxState(value) }
                        style={ styles.input }
                    />
                </CustomCard>

                <CustomCard 
                    style={{ margin: 10, marginTop: 20, height: 55, borderRadius: 10 }}
                    elevated={true}
                >
                    <Input 
                        placeholder="Address..."
                        inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                        placeholderTextColor='gray'
                        value={this.props.address}
                        secureTextEntry={false}
                        onChangeText={ value => this.props.setAddressInReduxState(value) }
                        style={ styles.input }
                    />
                </CustomCard>


                <View style={ styles.viewStyle }>
                    <MattizButton
                        title={'Send'}
                        onPress={() => this.sendTx()} 
                    />
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
    return {
        amount,
        address
    };
}

const mapDispatchtoProps = dispatch => ({
    setAmountInReduxState: amount => dispatch(setAmountInReduxState(amount)),
    setAddressInReduxState: address => dispatch(setAddressInReduxState(address)),
    clearTxForm: () => dispatch(clearTxForm())
});

export default connect(MapStateToProps, mapDispatchtoProps)(SendForm);