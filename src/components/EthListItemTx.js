import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import CustomCard from './common/CustomCard';

import { ethers } from 'ethers';

export default class EthListItemTx extends Component {

    render() {
        const {
            tx
        } = this.props;

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
            <CustomCard style={{ height: 65 }} elevated={true}>
                <View style={ container }>

                    <View style={ iconBox }>
                        <Icon name={'log-in'} size={25} color={'gray'} />
                    </View>

                    <View style={ textBox }>
                        <View style={ titleBox }>
                            <Text style={ titleText }>{ tx.from.slice(0, 10) + '...' }</Text>
                        </View>

                        <View style={ dateBox }>
                            <Text style={ dateText }> Confirmed </Text>
                        </View>
                    </View>

                    <View style={ rightBox }>
                        <View style={ amountBox }>
                            <Text style={ amountText }>{ ethers.utils.formatEther(tx.value.toString()) * 170 } $</Text>
                        </View>

                        <View style={ dot }>
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
        flexDirection: 'row' 
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