import React from 'react';
import { View } from 'react-native';

const CustomCard = props => {
    return (
        <View style={ styles.container }>
            {
                props.children
            }
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        margin: 5,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#FDFFFE',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }
};

export default CustomCard;