import React from 'react';
import { View, Text } from 'react-native';

import styles from '../../styles';

// Props:
// @ fee:           - Required. Fee amount to display.
// @ balance:       - Required. Balance amount to display.

const FeeAndBalanceCard = props => {

    const { 
        container,
        feeBox,
        balanceBox,
        balanceTitle
    } = compStyles;

    const {
        extraSmallLightTitle,
        extraSmallRegularNumber
    } = styles;


    console.log(props.fee)
    console.log(props.balance)
    
    return (
        <View style={ container }>
            <View style={ feeBox }>
                <Text style={ extraSmallLightTitle }>
                    Fee:  
                        <Text style={ extraSmallRegularNumber }>
                            { '   $' + props.fee }
                        </Text>
                </Text>
            </View>

            <View style={ balanceBox }>
                <Text style={ balanceTitle }>
                    Balance:  
                        <Text style={ extraSmallRegularNumber }>
                        { '   $' + props.balance }
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const compStyles = {
    container: { 
        flex: 2, 
        flexDirection: 'row', 
        marginLeft: '7%',
        marginRight: '7%'
    },
    feeBox: { 
        flex: 1, 
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'center'
    },
    balanceBox: { 
        flex: 1.5, 
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '4%'
    },
    balanceTitle: [ 
        styles.extraSmallLightTitle, { 
            marginLeft: 25 
        } 
    ]
}

export default FeeAndBalanceCard;