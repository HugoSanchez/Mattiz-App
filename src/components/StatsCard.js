import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import StatusDot from './common/StatusDot';
import CustomCard from './common/CustomCard';

// Props:
// @icon: icon name.
// @text: text to display.
// @amount: amount to display.

export default class StatsCard extends Component {

    render() {
        const {
            container,
            iconBox,
            textBox,
            titleText,
            rightBox,
            amountBox,
            amountText,
            dot
        } = styles;

        return (
            <View style={{ flex: 1 }}>
                <View style={ container }>

                    <View style={ iconBox }>
                        <Icon name={this.props.icon} size={20} color={'gray'} />
                    </View>

                    <View style={ textBox }>
                        <Text style={ titleText }>{this.props.text}</Text>
                    </View>

                    <View style={ rightBox }>
                        <View style={ amountBox }>
                            <Text style={ amountText }>${this.props.amount}</Text>
                        </View>

                        <View style={ dot }>
                            <StatusDot positive={true} size={14}/>
                        </View>
                    </View>

                </View>
            </View>
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
        justifyContent: 'center',
        paddingRight: 25,
    },
    titleText: {
        fontFamily: 'Raleway',
        fontSize: 18,
        color: '#040026'
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