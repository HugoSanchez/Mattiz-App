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

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadPlaidInfo();
    }

    render() {

        return (
            <View style={styles.container}>
                <Header />
                    <CustomCard style={styles.balanceBoxContainer} elevated={false}>
                        <View style={{ flex: 6, alignSelf: 'stretch', alignItems: 'center', boderWidth: 1, borderColor: '#000' }}>
                            <SimpleLineChart data={[4, 5, 4, 6, 7, 4, 5, 6, 10, 12, 10 ]}>
                            <View style={{ alignSelf: 'stretch', alignItems: 'center', paddingTop: '5%' }}>
                                <Text style={[ GS.extraSmallBoldNumber, { color: colors.numbersGreen } ]}>
                                    0.92%
                                </Text> 
                                <Text style={ GS.bigLightNumber }>
                                    {  numeral(this.props.balance).format('0,0.00') } €
                                </Text>                    
                                <Text style={styles.textStyle}> Aggregated Balance </Text>
                            </View>
                            </SimpleLineChart>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', marginRight: '8%', marginLeft: '8%', marginTop: '15%' }}>
                            <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                                <Text style={GS.extraSmallLightTitle}> Week </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                                <Text style={[GS.extraSmallLightTitle, {fontFamily: 'Raleway-SemiBold'}]}> Month </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                                <Text style={GS.extraSmallLightTitle}> Quarter </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}>
                                <Text style={GS.extraSmallLightTitle}> Year </Text>
                            </View>
                        </View> 
                    </CustomCard>

                <ScrollView style={{ flex: 1, alignSelf: 'stretch', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={ styles.boxContainer }>
                        <View style={{ flex: 4, flexDirection: 'row', paddingLeft: '2%', paddingRight: '2%' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#F7DDDD', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/totalBag.png')}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#DDEDF7', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/savingsIcon.png')}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#E7F7DD', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/smallEtherIcon.png')}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#F7F4DD', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/smallBitcoinIcon.png')}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%', backgroundColor: '#DDF7F6', borderRadius: 10 }}>
                                    <Image 
                                        style={{ height: 45, width: 45 }}
                                        source={require('../../assets/plusSign.png')}
                                    />
                                </View>
                            </View>
                        </View>
                        
                        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: '2%', paddingRight: '2%', marginBottom: '2%'}}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={styles.buttonsText}> Total </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={styles.buttonsText}> Savings </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={styles.buttonsText}> Ether </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={styles.buttonsText}> Bitcoin </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={styles.buttonsText}> Others </Text>
                            </View>
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
