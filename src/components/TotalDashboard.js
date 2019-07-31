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

// Redux actions.
import { 
    loadPlaidInfo, 
    setTimeframeinReduxState,
} from '../actions';

// Styles & Colors
import GS from '../styles'
import colors from '../constants/colors'

// Number parser 
const numeral = require('numeral');

// Dims
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

const weekData = [ 5, 6, 10, 12, 10 ]
const monthData = [ 4, 5, 4, 6, 7, 4, 5, 6, 10, 12, 10 ]
const quarterData = [ 6, 7, 5, 6, 8, 4, 5, 4, 6, 7, 4, 5, 6, 10, 12, 10 ]
const yearData = [ 4, 6, 7, 4, 5, 6, 5, 6, 6, 7, 5, 6, 8, 4, 5, 4, 6, 7, 4, 5, 6, 10, 12, 10 ]


class TotalDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 1, 1, 1, 1, 1, 1, 1], 
            percentage: '0.00'
        }
    }

    componentWillMount() {
        this.props.loadPlaidInfo();
        this.setDummyData(this.props.timeframe)
    };

    setDummyData(timeframe) {
        switch(timeframe) {
            case 'week':
                this.setState({ data: weekData, percentage: '0.32%'})
                return 
            case 'month':
                this.setState({ data: monthData, percentage: '2.93%'})
                return 
            case 'quarter':
                this.setState({ data: quarterData, percentage: '3.68%'})
                return 
            case 'year':
                this.setState({ data: yearData, percentage: '6.45%'})
                return
            default:
                return 
        }
    }

    reloadBalanceData(timeframe) {
        this.props.setTimeframeinReduxState(timeframe)
        this.setDummyData(timeframe)
    }

    render() {
        const {
            container,
            chartContainer,
            titleContainer,
            balanceContainer,
            textStyle
        } = styles;

        return (
            <CustomCard style={ container }>
                 <View style={ titleContainer }>
                    <Text style={[ GS.extraSmallBoldNumber, { color: colors.numbersGreen } ]}>
                        { this.state.percentage }
                    </Text> 
                    <View style={ balanceContainer }>
                        <Text style={ GS.bigLightNumber }>
                            {  numeral(this.props.balance).format('0,0.00') } €
                        </Text>                    
                        <Text style={ textStyle }> Aggregated Balance </Text>
                    </View>
                </View>

                <View style={ chartContainer }>
                    <SimpleLineChart data={ this.state.data } />
                </View>

                <TimeframeSelector
                    onWeekPress={() => this.reloadBalanceData('week')}
                    onMonthPress={() => this.reloadBalanceData('month')}
                    onQuarterPress={() => this.reloadBalanceData('quarter')}
                    onYearPress={() => this.reloadBalanceData('year')}
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
        marginBottom: '2%',
        backgroundColor: '#FFF',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 2 
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
    loadPlaidInfo: () => {
        dispatch(loadPlaidInfo())
    },
    setTimeframeinReduxState: timeframe => {
        dispatch(setTimeframeinReduxState(timeframe))},
});

const mapStateToProps = state => {
    const { balance } = state.plaid;
    const { timeframe } = state.timeframe;

    return { 
        timeframe,
        balance
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (TotalDashboard);