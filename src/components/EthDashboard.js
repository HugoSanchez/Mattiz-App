import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';

// Components
import SimpleLineChart from '../components/charts/SimpleLineChart';
import CustomCard from '../components/common/CustomCard';
import TimeframeSelector from '../components/common/TimeframeSelector';

import { 
    loadMarketDataETH,
    setTimeframeinReduxState 
} from '../actions';

// Styles & Colors
import GS from '../styles'
import colors from '../constants/colors'

// Number parser 
const numeral = require('numeral');

// Dims
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

class EthDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.props.loadMarketDataETH(this.props.timeframe)
    }

    reloadMarketDataETH(timeframe) {
        this.props.setTimeframeinReduxState(timeframe)
        this.props.loadMarketDataETH(timeframe)
    }

    render() {
        const {
            container,
            chartContainer,
            titleContainer,
            balanceContainer,
            textStyle,
        } = styles;

        const {
            currentPriceETH,
            historicPriceETH,
            percentageChangeETH
        } = this.props;


        return (
            <CustomCard style={ container }>
                <View style={ titleContainer }>          
                    <Text style={ GS.extraSmallLightNumber }>
                        {  numeral(currentPriceETH).format('0,0.00') }$
                            <Text style={[ GS.extraSmallLightNumber,
                                percentageChangeETH < 0 
                                ? { color: colors.numbersRed }
                                : { color: colors.numbersGreen }]}>
                            {   
                                percentageChangeETH < 0 
                                ?'  ' + percentageChangeETH
                                :'  +' + percentageChangeETH 
                            }%
                        </Text>
                    </Text> 

                    <View style={ balanceContainer }>
                        <Text style={ GS.bigLightNumber }>
                            {  numeral('3,197.38').format('0,0.00') +'€' + ' ' }
                        </Text>                                   
                    </View>
                    <Text style={ textStyle }> ETH Balance </Text> 
                </View>

                <View style={ chartContainer }>
                    <SimpleLineChart data={ historicPriceETH } />
                </View>

                <TimeframeSelector
                    onWeekPress={() => this.reloadMarketDataETH('week')}
                    onMonthPress={() => this.reloadMarketDataETH('month')}
                    onQuarterPress={() => this.reloadMarketDataETH('quarter')}
                    onYearPress={() => this.reloadMarketDataETH('year')}
                />
            </CustomCard>
        );
    }
}

const styles = {
    container: {
        height: height * 0.35,
        width: width,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        marginBottom: '2%',
        backgroundColor: '#FFF',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.10,
        shadowRadius: 2.65,
        elevation: 1 
    }, 
    chartContainer: { 
        flex: 6, 
        alignSelf: 'stretch', 
        alignItems: 'center', 
    },
    titleContainer: {
        flex: 1, 
        alignSelf: 'stretch', 
        alignItems: 'center',
        marginTop: '2%',
        marginBottom: '2%',
    },
    balanceContainer: {
        marginTop: '0.5%',
        marginBottom: '0.5%', 
        alignItems: 'center' 
    },
    textStyle: {
        fontFamily: 'Raleway-Light',
        fontSize: 14,
        color: colors.primaryBlue
    }
}

const mapDispatchToProps = dispatch => ({
    loadMarketDataETH: timeframe => {
        dispatch(loadMarketDataETH(timeframe))},
    setTimeframeinReduxState: timeframe => {
        dispatch(setTimeframeinReduxState(timeframe))},
});

const mapStateToProps = state => {
    const { 
        currentPriceETH, 
        historicPriceETH,
        percentageChangeETH, 
    } = state.marketData;

    const { timeframe } = state.timeframe;

    return { 
        timeframe,
        currentPriceETH,
        historicPriceETH,
        percentageChangeETH
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (EthDashboard);