import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from '../../styles';
import colors from '../../constants/colors';

// Dims. 
const width =  Dimensions.get('window').width

// Props:
// @ mainCurrency:      - Required. Top currency to display.
// @ onPressMax:        - Required. Function to be executed on press MAX button.
// @ amount:            - Required. Main amount to displayed to be passed as STRING.
// @ subCurrencyAmount:       - Optional. Sub currency amount to displayed to be passed as STRING.
// @ subDenomination:   - Optional. Sub currency denomination.


const SendModalAmountHeader = props => {

    const { 
        container, 
        cardStyle,
        titleContainer,
        rightBox,
        mainRow,
        leftBox,
        amountBox,
        leftButton,
        rightButton,
        mainCurrencyContainer,
        subCurrencyContainer
    } = compStyles;
    
    return (
        <View style={container}>
            <View style={cardStyle}>
                <View style={ mainCurrencyContainer }>
                    <Text style={ titleContainer }>
                       { props.mainCurrency }
                    </Text>
                </View>
                <View style={ mainRow }>
                    <View style={ leftBox }>
                        <TouchableOpacity 
                            onPress={ props.onPressMax }
                            style={ leftButton }>
                            <Text style={ styles.extraSmallTitle }>
                                max
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={ amountBox }>
                        <Text style={{ 
                            fontFamily: 'Aleo-Regular',
                            alignSelf: 'center', 
                            fontSize: props.amount.length > 5 ? 38 : 46, 
                            color: colors.primaryBlue }}>
                            { 
                                props.amount 
                            }
                        </Text>
                    </View>
                
                    <View style={ rightBox }>
                        <View style={ rightButton }>
                            <Icon 
                                name='refresh-cw' 
                                size={20} 
                                style={{ transform: [{ rotate: '90deg'}] }} 
                                color={colors.primaryBlue}
                            />
                        </View>
                    </View>
                </View>
                <View style={ subCurrencyContainer }>
                    <Text style={ styles.extraSmallLightNumber }>
                        { props.subCurrencyAmount + props.subDenomination } 
                    </Text>
                </View>
            </View>
        </View>
    );
}

const compStyles = {
    container: { 
        flex: 8, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    cardStyle: { 
        flex: 1, 
        alignSelf: 'stretch',
        alignItems: 'center' 
    },
    titleContainer: [ 
        styles.extraSmallLightTitle, { 
            marginBottom: '2%'
        }
    ],
    mainCurrencyContainer: { 
        flex: 1, 
        justifyContent: 'flex-end'
    },
    mainRow: { 
        flex: 1, 
        flexDirection: 'row', 
        alignSelf: 'stretch' 
    },
    rightBox: { 
        flex: 1, 
        alignItems: 'flex-start', 
        justifyContent: 'center' 
    },
    leftBox: { 
        flex: 1, 
        alignItems: 'flex-end', 
        justifyContent: 'center' 
    },
    amountBox: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    leftButton: { 
        height: width * 0.1, 
        width: width * 0.14, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: '15%', 
        backgroundColor: '#DDEDF7', 
        borderRadius: 10 
    },
    rightButton: { 
        height: width * 0.1, 
        width: width * 0.14, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginLeft: '15%', 
        backgroundColor: '#DDEDF7', 
        borderRadius: 10 
    },
    subCurrencyContainer: { 
        flex: 1, 
        alignSelf: 'stretch', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        marginTop: '2%' 
    },
}

export default SendModalAmountHeader;