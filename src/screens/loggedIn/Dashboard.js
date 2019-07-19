import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    ScrollView,
    Dimensions,
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

// Components.
import Header from '../../components/common/Header';
import CustomCard  from '../../components/common/CustomCard';
import SimpleLineChart from '../../components/charts/SimpleLineChart';
import ArtSlider from '../../components/ArtSlider'

// Utils.
import { getHistoricEthPrice, getEthPrice, getBtcPrice } from '../../api/auth'

// Redux actions.
import { loadPlaidInfo } from '../../actions';

//General Styles & Colors
import GS from '../../styles'
import colors from '../../constants/colors'

// Number parser 
const numeral = require('numeral');

// Dims. 
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

const weekData = [ 5, 6, 10, 12, 10 ]
const monthData = [ 4, 5, 4, 6, 7, 4, 5, 6, 10, 12, 10 ]
const quarterData = [ 6, 7, 5, 6, 8, 4, 5, 4, 6, 7, 4, 5, 6, 10, 12, 10 ]
const yearData = [ 4, 6, 7, 4, 5, 6, 5, 6, 6, 7, 5, 6, 8, 4, 5, 4, 6, 7, 4, 5, 6, 10, 12, 10 ]

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeframe: 'month',
            boxItem: 'total',
            data: monthData,
            percentage: '+ 0.92%',
            balance: '1.22',
            price: '0.00',
            btcPrice: '0.00',
            ethBalance: '3,197.38',
            btcBalance: '1517.95'
        }
    }

    componentWillMount() {
        this.props.loadPlaidInfo();
        getEthPrice().then(res => this.setState({ price: res.data.ticker.price }))
        getBtcPrice().then(res => this.setState({ btcPrice: res.data.ticker.price }))
    }

    reloadData(timeframe) {
        if (this.state.boxItem === 'total') {
            if (timeframe == 'week') {
                this.setState({ data: weekData, percentage: '+ 0.15%' })
            }
            if (timeframe == 'month') {
                this.setState({ data: monthData, percentage: '+ 0.92%' })
            }
            if (timeframe == 'quarter') {
                this.setState({ data: quarterData, percentage: '+ 2.66%' })
            }
            if (timeframe == 'year') {
                this.setState({ data: yearData, percentage: '+ 4.49%' })
            }
        }
        if (this.state.boxItem === 'savings') {
            if (timeframe == 'week') {
                this.setState({ data: weekData.map(i => i - 1), percentage: '+ 0.15%' })
            }
            if (timeframe == 'month') {
                this.setState({ data: monthData.map(i => i - 1), percentage: '+ 0.92%' })
            }
            if (timeframe == 'quarter') {
                this.setState({ data: quarterData.map(i => i - 2), percentage: '+ 2.66%' })
            }
            if (timeframe == 'year') {
                this.setState({ data: yearData.map(i => i - 3), percentage: '+ 4.49%' })
            }
        }
        if (this.state.boxItem === 'ether') {
            if (timeframe == 'week') {
                this.loadEthData()
            }
            if (timeframe == 'month') {
                this.loadEthData()
            }
            if (timeframe == 'quarter') {
                this.loadEthData()
            }
            if (timeframe == 'year') {
                this.loadEthData()
            }
        }
    }

    loadEthData() {
        getHistoricEthPrice(this.state.timeframe)
            .then(res => this.setState({ data: res.data.rates }))
    }

    render() {

        return (
            <View style={styles.container}>
                <Header />
                    <CustomCard style={styles.balanceBoxContainer} elevated={false}>
                        <View style={{ flex: 6, alignSelf: 'stretch', alignItems: 'center', boderWidth: 1, borderColor: '#000' }}>
                            <SimpleLineChart data={this.state.data}>
                            <View style={{ alignSelf: 'stretch', alignItems: 'center', paddingTop: '5%' }}>
                                <Text style={[ GS.extraSmallBoldNumber, { color: colors.numbersGreen } ]}>
                                    { this.state.percentage }
                                </Text> 
                                {
                                    this.state.boxItem == 'total' ?
                                    <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                                        <Text style={ GS.bigLightNumber }>
                                            {  numeral(this.props.balance).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> Aggregated Balance </Text>
                                    </View>
                                    :
                                    null
                                }
                                {
                                    this.state.boxItem == 'savings' ?
                                    <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                                        <Text style={ GS.bigLightNumber }>
                                            {  numeral(this.state.balance).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> Current Accounts Balance </Text>
                                    </View>
                                    :
                                    null
                                }
                                {
                                    this.state.boxItem == 'ether' ?
                                    <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                                        <Text style={ GS.bigLightNumber }>
                                            {  numeral(this.state.ethBalance).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> ETH Balance </Text>
                                        <Text style={[ GS.smallLightNumber, { marginTop: '2%'} ]}>
                                            {  numeral(this.state.price).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> ETH Price </Text>
                                    </View>
                                    :
                                    null
                                }
                                {
                                    this.state.boxItem == 'bitcoin' ?
                                    <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                                        <Text style={ GS.bigLightNumber }>
                                            {  numeral(this.state.btcBalance).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> BTC Balance </Text>
                                        <Text style={[ GS.smallLightNumber, { marginTop: '2%'} ]}>
                                            {  numeral(this.state.btcPrice).format('0,0.00') } €
                                        </Text>                    
                                        <Text style={styles.textStyle}> BTC Price </Text>
                                    </View>
                                    :
                                    null
                                }
                            </View>
                            </SimpleLineChart>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', marginRight: '8%', marginLeft: '8%', marginTop: '15%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ timeframe: 'week' }) 
                                    this.reloadData('week')
                                }} 
                                style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                                <Text style={[
                                    GS.extraSmallLightTitle,
                                    this.state.timeframe == 'week' ?
                                    { fontFamily: 'Raleway-SemiBold'}
                                    :
                                    null 
                                    ]}> 
                                        Week 
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ timeframe: 'month' }) 
                                    this.reloadData('month')
                                }} 
                                style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                                <Text style={[
                                    GS.extraSmallLightTitle,
                                    this.state.timeframe == 'month' ?
                                    { fontFamily: 'Raleway-SemiBold'}
                                    :
                                    null 
                                    ]}> 
                                        Month 
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ timeframe: 'quarter' }) 
                                    this.reloadData('quarter')
                                }}  
                                style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                                <Text style={[
                                    GS.extraSmallLightTitle,
                                    this.state.timeframe == 'quarter' ?
                                    { fontFamily: 'Raleway-SemiBold'}
                                    :
                                    null 
                                    ]}> 
                                        Quarter 
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ timeframe: 'year' }) 
                                    this.reloadData('year')
                                }}  
                                style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                                <Text style={[
                                    GS.extraSmallLightTitle,
                                    this.state.timeframe == 'year' ?
                                    { fontFamily: 'Raleway-SemiBold'}
                                    :
                                    null 
                                    ]}> 
                                        Year 
                                    </Text>
                            </TouchableOpacity>
                        </View> 
                    </CustomCard>

                <ScrollView style={{ flex: 1, alignSelf: 'stretch', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={ styles.boxContainer }>
                        <View style={{ flex: 4, flexDirection: 'row', paddingLeft: '2%', paddingRight: '2%' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.setState({ boxItem: 'total' })
                                        this.reloadData(this.state.timeframe)
                                    }} 
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#F7DDDD', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/totalBag.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.setState({ boxItem: 'savings', balance: '107011.19', percentage: '+ 1.25%'})
                                        this.reloadData(this.state.timeframe)
                                    }} 
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#DDEDF7', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/savingsIcon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.loadEthData()
                                        this.setState({ boxItem: 'ether'})
                                    }} 
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#E7F7DD', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/smallEtherIcon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.setState({ boxItem: 'bitcoin'})
                                    }}  
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#F7F4DD', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/smallBitcoinIcon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity 
                                    onPress={ () => {
                                        this.setState({ boxItem: 'others'})
                                    }} 
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#DDF7F6', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/plusSign.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: '2%', paddingRight: '2%', marginBottom: '2%'}}>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'total'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'total'?
                                    { fontFamily: 'Raleway-SemiBold'}
                                    :
                                    null
                                    ]}> Total </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'savings'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'savings'?
                                    { fontFamily: 'Raleway-SemiBold'}
                                    :
                                    null
                                    ]}> Savings </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'ether'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'ether'?
                                    { fontFamily: 'Raleway-SemiBold'}
                                    :
                                    null
                                    ]}> Ether </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'bitcoin'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'bitcoin'?
                                    { fontFamily: 'Raleway-SemiBold'}
                                    :
                                    null
                                    ]}> Bitcoin </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.setState({ boxItem: 'others'})
                                }}
                                style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[
                                    styles.buttonsText, 
                                    this.state.boxItem == 'others'?
                                    { fontFamily: 'Raleway-SemiBold'}
                                    :
                                    null
                                    ]}> Others </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={ styles.detailsContainer }>
                        <View style={{ height: height * 0.05, justifyContent: 'center', paddingLeft: '5%'}}>
                            <Text style={{ fontFamily: 'Raleway-SemiBold', fontSize: 20 }}> 
                                Savings 
                            </Text>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF'}}>
                                    <Image 
                                        style={{ height: height * 0.04, width: height * 0.04, borderRadius: (height * 0.04) / 2 }}
                                        source={{ uri: 'https://bit.ly/2LsSE8u'}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Bank of America 
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(54595.98).format('0,0.00') } €
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersGreen, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 2,75%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.07, width: height * 0.07, borderRadius: (height * 0.07) / 2 }}
                                        source={{ uri: 'https://bit.ly/2O1YGPw'}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Chase Bank
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(52415.21).format('0,0.00') } €
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersRed, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        - 5,75%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.06, width: height * 0.06, borderRadius: (height * 0.06) / 2 }}
                                        source={{ uri: 'https://bit.ly/2NXvIjE'}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Compound USDC 
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(1595.9783).format('0,0.0000') } $
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersGreen, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 2,64%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                        source={{ uri: 'https://bit.ly/2XM7Gws'}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Compound DAI 
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(517.9566).format('0,0.0000') } $
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersGreen, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 2,49%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.05, justifyContent: 'center', paddingLeft: '5%'}}>
                            <Text style={{ fontFamily: 'Raleway-SemiBold', fontSize: 20 }}> 
                                Stats 
                            </Text>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#fffeea', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                        source={{ uri: 'https://bit.ly/2YhLjyI'}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Spenditures: 
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(455.28).format('0,0.00') } €
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersRed, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 2,75%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#fffeea', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                        source={{ uri: 'https://bit.ly/32v9wRc'}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Income: 
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(2635.83).format('0,0.00') } €
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersGreen, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 0,00%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#fffeea', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                        source={{ uri: 'https://bit.ly/2Z0YNMm'}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Interests Earned:  
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(126.72).format('0,0.00') } €
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersGreen, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 0,00%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#fffeea', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                        source={{ uri: 'https://bit.ly/2YWd4cR'}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Capital Commited:  
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(18426.93).format('0,0.00') } €
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersGreen, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 0,00%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.05, justifyContent: 'center', paddingLeft: '5%'}}>
                            <Text style={{ fontFamily: 'Raleway-SemiBold', fontSize: 20 }}> 
                                Investments 
                            </Text>
                        </View>

                        <View style={{ height: height * 0.05, justifyContent: 'center', paddingLeft: '5%'}}>
                            <Text style={{ fontFamily: 'Raleway-SemiBold', fontSize: 18 }}> 
                               // Tokens 
                            </Text>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#E7F7DD', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                        source={require('../../assets/smallEtherIcon.png')}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Ether 
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(3197.38).format('0,0.00') } €
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersGreen, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 2,49%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#F7F4DD', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                        source={require('../../assets/smallBitcoinIcon.png')}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Bitcoin 
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(1517.95).format('0,0.00') } €
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersGreen, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 2,49%
                                    </Text> 
                                </View>
                            </View>
                        </View>

                        <View style={{ height: height * 0.08, flexDirection: 'row', paddingLeft: '2%'  }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image 
                                        style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                        source={{ uri: 'https://bit.ly/2LZrBRA'}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 18 }}> 
                                    Numeraire 
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ GS.extraSmallLightNumber, { marginTop: '15%'} ]}>
                                        {  numeral(127.63).format('0,0.00') } €
                                    </Text> 
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[ 
                                        GS.extraSmallBoldNumber, 
                                        { color: colors.numbersGreen, fontSize: 12, marginBottom: '10%' } 
                                        ]}>
                                        + 2,49%
                                    </Text> 
                                </View>
                            </View>
                        </View>
                               
                        <View style={{ height: height * 0.05, justifyContent: 'center', paddingLeft: '5%'}}>
                            <Text style={{ fontFamily: 'Raleway-SemiBold', fontSize: 18 }}> 
                               // Arts 
                            </Text>
                        </View>

                        <View style={{ height: height * 0.35, width: width * 0.9, justifyContent: 'center', alignItems: 'center', marginLeft: '2.5%' }}>
                            <ScrollView horizontal={true}>
                                <ArtSlider />
                            </ScrollView>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#F0EFEF',
    },
    balanceBoxContainer: {
        height: height * 0.35,
        width: width,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2%',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 2
    },
    boxContainer: {
        height: height * 0.10,
        width: width * 0.95,
        backgroundColor: '#FFF',
        margin: 5,
        marginLeft: '2.5%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 2,
    },
    detailsContainer: {
        height: height * 1.5,
        width: width * 0.95,
        marginLeft: '2.5%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
    },
    statusAvatar: {
        width: 20,
        height: 20, 
        borderRadius: 10,
        backgroundColor: '#E5F2D4',
        marginLeft: 16
    },
    balanceStyle: {
        fontFamily: 'Aleo-Light',
        fontSize: 32
    },
    textStyle: {
        fontFamily: 'Raleway-Light',
        fontSize: 14,
        color: colors.primaryBlue
    },
    buttonsText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 14,
        color: colors.primaryBlue
    }
})

const mapDispatchToProps = dispatch => ({
    loadPlaidInfo: () => dispatch(loadPlaidInfo()),
});

const mapStateToProps = state => {
    const { balance, transactions, loading } = state.plaid;
    return {
        balance,
        transactions,
        loading
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (withNavigationFocus(Dashboard)
);
