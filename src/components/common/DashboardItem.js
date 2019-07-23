import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

// General Styles & Colors
import GS from '../../styles'
import colors from '../../constants/colors'

// Number parser 
const numeral = require('numeral');

// Dims. 
const height = Dimensions.get('window').height

// Props:
// @containerHeight: object, optional; 
// @iconBox: object, optional.
// @imageStyle: object, optional.
// @image: component, optional.
// @uri: sting, required. 
// @title: string, required.
// @amount: string, required.
// @percentage: string, required.

const DashboardItem = props => {
    return (
        <View style={[ styles.container, props.containerHeight ]}>
            <View style={ GS.container }>
                <View style={[ styles.iconBox, props.iconBox ]}>
                    {
                        props.image ?
                        props.image
                        :
                        <Image 
                            style={[ styles.imageStyle, props.imageStyle ]}
                            source={{ uri: props.uri }}
                        />
                    }
                </View>
            </View>
                            
            <View style={ styles.textBox }>
                <Text style={ styles.textStyle }> 
                    {
                        props.title
                    }
                </Text>
            </View>
                            
            <View style={ styles.numbersBox }>
                <View style={ GS.container }>
                    <Text style={ styles.amountStyle }>
                        {  numeral(props.amount).format('0,0.00') } €
                    </Text> 
                </View>
                 <View style={ GS.container }>
                    <Text style={[ 
                        styles.percentageStyles, 
                        props.positive ? 
                        { color: colors.numbersGreen } 
                        : 
                        { color: colors.numbersRed }
                    ]}>
                        {
                            props.percentage
                        }
                    </Text> 
                </View>
            </View>

        </View>
    );
}

const styles = {
    container: {
        height: height * 0.08, 
        flexDirection: 'row', 
        paddingLeft: '2%'
    },
    iconBox: { 
        height: height * 0.05, 
        width: height * 0.05, 
        borderRadius: (height * 0.05) / 2, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#FFF'
    },
    imageStyle: { 
        height: height * 0.04, 
        width: height * 0.04, 
        borderRadius: (height * 0.04) / 2 
    },
    textBox: { 
        flex: 3, 
        justifyContent: 'center' 
    },
    textStyle: { 
        fontFamily: 'Raleway-Regular', 
        fontSize: 18 
    },
    numbersBox: { 
        flex: 2 
    },
    amountStyle: [ 
        GS.extraSmallLightNumber, 
        { marginTop: '15%'} 
    ],
    percentageStyles: [ 
        GS.extraSmallBoldNumber, 
        { 
            color: colors.numbersGreen, 
            fontSize: 12, 
            marginBottom: '10%' 
        } 
    ]
};

export default DashboardItem;