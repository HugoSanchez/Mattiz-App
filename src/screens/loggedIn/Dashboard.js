import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    ScrollView,
    Dimensions,
    StyleSheet 
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';

// Components.
import Header from '../../components/common/Header';
import CustomCard  from '../../components/common/CustomCard';
import DashboardItem from '../../components/common/DashboardItem';
import TimeframeSelector from '../../components/common/TimeframeSelector'
import SimpleLineChart from '../../components/charts/SimpleLineChart';
import DashboardSelector from '../../components/DashboardSelector';
import ArtSlider from '../../components/ArtSlider'

// Utils.
import { 
    getHistoricEthPrice, 
    getEthPrice, 
    getBtcPrice 
} from '../../api/auth'

// Redux actions.
import { 
    loadPlaidInfo, 
    setTimeframeinReduxState,
    setDashboardInReduxState
} from '../../actions';

//General Styles & Colors
import GS from '../../styles'
import colors from '../../constants/colors'
import EthDashboard from '../../components/EthDashboard';

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
    }

    render() {

        return (
            <View style={styles.container}>
                <Header />
                <EthDashboard />
                <ScrollView style={{ flex: 1, alignSelf: 'stretch', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <DashboardSelector
                        onTotalPress={() => {
                            this.setState({ boxItem: 'total' })
                            this.props.setDashboardInReduxState('total')
                        }}
                        onSavingsPress={() => {
                            this.setState({ boxItem: 'savings', balance: '107011.19', percentage: '+ 1.25%'})
                            this.props.setDashboardInReduxState('savings')
                        }}
                        onEtherPress={() => this.props.setDashboardInReduxState('ether') }
                        onBitcoinPress={() => this.props.setDashboardInReduxState('bitcoin') }
                        onOthersPress={() =>  this.props.setDashboardInReduxState('others') }
                    />

                    <View style={ styles.detailsContainer }>
                        <View style={ styles.categoryBox }>
                            <Text style={ styles.catgeoryTitle }> 
                                Savings 
                            </Text>
                        </View>

                        <DashboardItem
                            uri='https://bit.ly/2LsSE8u'
                            title="Bank of America"
                            amount={54595.98}
                            percentage="+ 2,75%"
                            positive={true}
                        />

                        <DashboardItem
                            uri='https://bit.ly/2O1YGPw'
                            title="Chase Bank"
                            amount={52415.21}
                            percentage="- 5,75%"
                            positive={false}
                            imageStyle={{ height: height * 0.07, width: height * 0.07, borderRadius: (height * 0.07) / 2 }}
                        />

                        <DashboardItem
                            uri='https://bit.ly/2NXvIjE'
                            title="Compound USDC"
                            amount={1595.9783}
                            percentage="+ 2,64%"
                            positive={true}
                            imageStyle={{ height: height * 0.06, width: height * 0.06, borderRadius: (height * 0.06) / 2 }}
                        />

                        <DashboardItem
                            uri='https://bit.ly/2XM7Gws'
                            title="Compound DAI"
                            amount={517.9566}
                            percentage="+ 2,49%"
                            positive={true}
                            imageStyle={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                        />

                        <View style={ styles.categoryBox }>
                            <Text style={ styles.catgeoryTitle }> 
                                Stats 
                            </Text>
                        </View>

                        <DashboardItem
                            uri='https://bit.ly/2YhLjyI'
                            title="Spenditures"
                            amount={455.28}
                            percentage="+ 2,75%"
                            positive={true}
                            imageStyle={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                        />

                        <DashboardItem
                            uri='https://bit.ly/32v9wRc'
                            title="Income"
                            amount={2635.83}
                            percentage="+ 0,00%"
                            positive={true}
                            imageStyle={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                        />

                        <DashboardItem
                            uri='https://bit.ly/2Z0YNMm'
                            title="Interests Earned"
                            amount={126.72}
                            percentage="+ 0,00%"
                            positive={true}
                            imageStyle={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                        />

                        <DashboardItem
                            uri='https://bit.ly/2YWd4cR'
                            title="Capital Commited"
                            amount={18426.93}
                            percentage="+ 0,00%"
                            positive={true}
                            imageStyle={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                        />

                        <View style={ styles.categoryBox }>
                            <Text style={ styles.catgeoryTitle }> 
                                Investments 
                            </Text>
                        </View>

                        <View style={ styles.categoryBox }>
                            <Text style={ styles.categorySubtitle }> 
                               // Tokens 
                            </Text>
                        </View>

                        <DashboardItem
                            image={
                                <Image 
                                    style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                    source={require('../../assets/smallEtherIcon.png')}
                                />
                            }
                            iconBox={{ backgroundColor: '#E7F7DD' }}
                            title="Ether"
                            amount={3197.38}
                            percentage="+ 2,49%"
                            positive={true}
                        />

                        <DashboardItem
                            image={
                                <Image 
                                    style={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                                    source={require('../../assets/smallBitcoinIcon.png')}
                                />
                            }
                            iconBox={{ backgroundColor: '#F7F4DD' }}
                            title="Bitcoin"
                            amount={1517.95}
                            percentage="+ 2,49%"
                            positive={true}
                        />

                        <DashboardItem
                            uri='https://bit.ly/2LZrBRA'
                            title="Numeraire"
                            amount={127.63}
                            percentage="+ 2,49%"
                            positive={true}
                            imageStyle={{ height: height * 0.05, width: height * 0.05, borderRadius: (height * 0.05) / 2 }}
                        />
                               
                        <View style={ styles.categoryBox }>
                            <Text style={ styles.categorySubtitle }> 
                               // Arts 
                            </Text>
                        </View>

                        <View style={ styles.sliderContainer }>
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
        backgroundColor: '#FFF',
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
    categoryBox: { 
        height: height * 0.05, 
        justifyContent: 'center', 
        paddingLeft: '5%'
    },
    catgeoryTitle: { 
        fontFamily: 'Raleway-SemiBold', 
        fontSize: 20 
    },
    categorySubtitle: { 
        fontFamily: 'Raleway-SemiBold', 
        fontSize: 18 
    },
    sliderContainer: { 
        height: height * 0.35, 
        width: width * 0.9, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: '2.5%' 
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
        fontFamily: 'Raleway-Regular'
    }
})

const mapDispatchToProps = dispatch => ({
    loadPlaidInfo: () => dispatch(loadPlaidInfo()),
    setTimeframeinReduxState: timeframe => dispatch(setTimeframeinReduxState(timeframe)),
    setDashboardInReduxState: dashboard => dispatch(setDashboardInReduxState(dashboard))
});

const mapStateToProps = state => {
    const { balance, transactions, loading } = state.plaid;
    const { dashboard } = state.dashboard;
    return {
        dashboard,
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