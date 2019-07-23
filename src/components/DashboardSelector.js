import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';

const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

// Props:
// @ onTotalPress:   - Required. Function to be executed.
// @ onSavingsPress: - Required. Function to be executed.
// @ onEtherPress:   - Required. Function to be executed.
// @ onBitcoinPress: - Required. Function to be executed.
// @ onOthersPress:  - Required. Function to be executed.

class DashboardSelector extends Component {

    render() {
        const {
            container,
            iconsContainer,
            iconBox,
            textContainer,
            textBox,
            buttonsText,
        } = styles;

        const {
            onTotalPress,
            onSavingsPress,
            onEtherPress,
            onBitcoinPress,
            onOthersPress,
            dashboard
        } = this.props;

        return (
            <View style={ container }>
                <View style={ iconsContainer }>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity 
                            onPress={ onTotalPress } 
                            style={[ iconBox, { backgroundColor: '#F7DDDD' }]}>
                            <Image 
                                style={{ height: 45, width: 45 }}
                                source={require('../assets/totalBag.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity 
                            onPress={ onSavingsPress } 
                            style={[ iconBox, { backgroundColor: '#DDEDF7' }]}>
                            <Image 
                                style={{ height: 45, width: 45 }}
                                source={require('../assets/savingsIcon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity 
                            onPress={ onEtherPress } 
                            style={[ iconBox, { backgroundColor: '#E7F7DD' }]}>
                            <Image 
                                style={{ height: 45, width: 45 }}
                                source={require('../assets/smallEtherIcon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity 
                            onPress={ onBitcoinPress }  
                            style={[ iconBox, { backgroundColor: '#F7F4DD' }]}>
                            <Image 
                                style={{ height: 45, width: 45 }}
                                source={require('../assets/smallBitcoinIcon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity 
                            onPress={ onOthersPress } 
                            style={[ iconBox, { backgroundColor: '#DDF7F6' }]}>
                            <Image 
                                style={{ height: 45, width: 45 }}
                                source={require('../assets/plusSign.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                        
                <View style={ textContainer }>
                    <View style={ textBox }>
                        <Text style={[ buttonsText, dashboard == 'total' ?
                            { fontFamily: 'Raleway-Bold'}
                            :
                            null
                            ]}> Total </Text>
                    </View>
                    <View style={ textBox }>
                        <Text style={[ buttonsText, dashboard == 'savings' ?
                            { fontFamily: 'Raleway-Bold'}
                            :
                            null
                            ]}> Savings </Text>
                    </View>
                    <View style={ textBox }>
                        <Text style={[ buttonsText, dashboard == 'ether' ?
                            { fontFamily: 'Raleway-Bold'}
                            :
                            null
                            ]}> Ether </Text>
                    </View>
                    <View style={ textBox }>
                        <Text style={[ buttonsText, dashboard == 'bitcoin' ?
                            { fontFamily: 'Raleway-Bold'}
                            :
                            null
                            ]}> Bitcoin </Text>
                    </View>
                    <View style={ textBox }>
                        <Text style={[ buttonsText, dashboard == 'others' ?
                            { fontFamily: 'Raleway-Bold'}
                            :
                            null
                            ]}> Others </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        height: height * 0.11,
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
    iconsContainer: { 
        flex: 4, 
        flexDirection: 'row', 
        paddingLeft: '2%', 
        paddingRight: '2%' 
    },
    iconBox: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: '10%', 
        borderRadius: 10 
    },
    textContainer: { 
        flex: 1, 
        flexDirection: 'row', 
        paddingLeft: '2%', 
        paddingRight: '2%', 
        marginBottom: '2%'
    },
    textBox: { 
        flex: 1, 
        alignItems: 'center' 
    },
    buttonsText: {
        fontFamily: 'Raleway-Regular'
    } 
}

const mapStateToProps = state => {
    const { dashboard } = state.dashboard;
    return { dashboard }
}

export default connect(mapStateToProps, {})(DashboardSelector);