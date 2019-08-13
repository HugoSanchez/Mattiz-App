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
    loadMarketDataBTC,
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

class BtcDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.props.loadMarketDataBTC(this.props.timeframe)
    }

    reloadMarketDataBTC(timeframe) {
        this.props.setTimeframeinReduxState(timeframe)
        this.props.loadMarketDataBTC(timeframe)
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
            currentPriceBTC,
            historicPriceBTC,
            percentageChangeBTC
        } = this.props;


        return (
            <CustomCard style={ container }>
                <View style={ titleContainer }>          
                    <Text style={ GS.extraSmallLightNumber }>
                        {  numeral(currentPriceBTC).format('0,0.00') }$
                            <Text style={[ GS.extraSmallLightNumber,
                                percentageChangeBTC < 0 
                                ? { color: colors.numbersRed }
                                : { color: colors.numbersGreen }]}>
                            {   
                                percentageChangeBTC < 0 
                                ?'  ' + percentageChangeBTC
                                :'  +' + percentageChangeBTC 
                            }%
                        </Text>
                    </Text> 

                    <View style={ balanceContainer }>
                        <Text style={[ GS.bigRegularNumber ]}>
                            {  numeral('1,132.96').format('0,0.00') +'€' + ' ' }
                        </Text>                                   
                    </View>
                    <Text style={ textStyle }> BTC Balance </Text> 
                </View>

                <View style={ chartContainer }>
                    <SimpleLineChart data={ historicPriceBTC } />
                </View>

                <TimeframeSelector
                    onWeekPress={() => this.reloadMarketDataBTC('week')}
                    onMonthPress={() => this.reloadMarketDataBTC('month')}
                    onQuarterPress={() => this.reloadMarketDataBTC('quarter')}
                    onYearPress={() => this.reloadMarketDataBTC('year')}
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
        alignItems: 'center' 
    },
    textStyle: {
        fontFamily: 'Raleway-Light',
        fontSize: 14,
        color: colors.primaryBlue,
    }
}

const mapDispatchToProps = dispatch => ({
    loadMarketDataBTC: timeframe => {
        dispatch(loadMarketDataBTC(timeframe))},
    setTimeframeinReduxState: timeframe => {
        dispatch(setTimeframeinReduxState(timeframe))},
});

const mapStateToProps = state => {
    const { 
        currentPriceBTC, 
        historicPriceBTC,
        percentageChangeBTC, 
    } = state.marketData;

    const { timeframe } = state.timeframe;

    return { 
        timeframe,
        currentPriceBTC,
        historicPriceBTC,
        percentageChangeBTC
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (BtcDashboard);