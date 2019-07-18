import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import StatusDot from './common/StatusDot';
import CustomCard from './common/CustomCard';

import { 
    amountToDisplay, 
    dotColor, 
    iconResolver, 
    isPositive
} from '../utils/StyleUtils';

export default class ListItemTx extends Component {

    render() {
        const tx = this.props.tx;

        const {
            container,
            iconBox,
            textBox,
            titleBox,
            titleText,
            dateBox,
            dateText,
            rightBox,
            amountBox,
            amountText,
            dot
        } = styles;

        return (
            <CustomCard style={{ height: 70 }} elevated={true}>
                <View style={ container }>

                    <View style={ iconBox }>
                        <Icon name={iconResolver(tx)} size={25} color={'gray'} />
                    </View>

                    <View style={ textBox }>
                        <View style={ titleBox }>
                            <Text style={ titleText }>{ tx.name }</Text>
                        </View>

                        <View style={ dateBox }>
                            <Text style={ dateText }>{ tx.date }</Text>
                        </View>
                    </View>

                    <View style={ rightBox }>
                        <View style={ amountBox }>
                            <Text style={ amountText }>{ isPositive(amountToDisplay(tx.amount)) } $</Text>
                        </View>

                        <View style={ dot }>
                            <StatusDot positive={dotColor(tx.amount)} size={14}/>
                        </View>
                    </View>

                </View>
            </CustomCard>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }, 
    iconBox: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    textBox: {
        flex: 3,
        flexDirection: 'column',
        paddingRight: 25,
    },
    titleBox: { 
        flex: 1,
        marginTop: 15,
        marginLeft: 10,  
    },
    titleText: {
        fontFamily: 'Raleway',
        fontSize: 14,
        color: '#040026'
    },
    dateBox: { 
        flex: 1, 
        marginBottom: 15,
        marginLeft: 10,
    },
    dateText: {
        fontFamily: 'Raleway-ExtraLight',
        fontSize: 16
    },
    rightBox: {
        flex: 2,
        flexDirection: 'row',
    },
    amountBox: {
        flex: 2.5, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    amountText: {
        fontFamily: 'NunitoSans-LightItalic',
        fontSize: 16,
        color: '#040026'
    },
    dot: { 
        flex: 1,
        marginLeft: 3,  
        justifyContent: 'center' 
    } 
})