import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import colors from '../../constants/colors'

// Props:

const Header = props => {
    return (
        <View style={[ styles.container, props.enlargedElement ? {height: '15%'} : null ]}>
            <View style={{ flexDirection: 'row'}}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {
                    props.leftIcon ?
                    <Icon name={props.leftIcon} size={20} color={colors.primaryBlue} style={{ marginTop: '35%' }}/> 
                    :
                    null
                }
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    style={{ height: 35, width: 70, marginTop: '20%'}}
                    source={require('../../assets/doubleLeaf.png')}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={'bell'} size={20} color={colors.primaryBlue} style={{ marginTop: '40%' }}/> 
            </View>
            </View>
            {
                props.enlargedElement ? 
                props.enlargedElement
                :
                null
            }
        </View>
    );
}

const styles = {
    container: {
        width: '100%',
        height: '12%',
        backgroundColor: '#fff', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 2,
    }
};

export default Header;