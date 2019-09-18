import React from 'react';
import { View, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';

import CustomCard from './CustomCard';

import colors from '../../constants/colors';

// Dims. 
const width =  Dimensions.get('window').width

// Props:
// @ flex:          -Required. Container flex.
// @ address:       -Required. Input value.
// @ placeholder:   -Required. Placeholder.
// @ onChangeText:  -Required. Function to execute.

const AddressInput = props => {
    return (
        <View style={[ styles.container, { flex: props.flex } ]}>
            <CustomCard 
                elevated={true}
                style={ styles.cardStyle }>
                <Input 
                    placeholder={props.placeholder}
                    inputContainerStyle={ styles.inputContainer }
                    placeholderTextColor='#040026'
                    value={ props.address }
                    secureTextEntry={false}
                    onChangeText={ value => props.onChangeText(value) }
                    inputStyle={ props.address > 0 ? styles.textInput : styles.placeholder  }
                />
            </CustomCard>
        </View>
    );
}

const styles = {
    container: { 
        flex: 3, 
        alignSelf: 'stretch', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    cardStyle: { 
        width: width * 0.7, 
        height: '100%', 
        alignSelf: 'center', 
        borderRadius: 10 
    },
    inputContainer: { 
        borderBottomColor: 'transparent', 
        marginTop: 5 
    },
    placeholder: {
        fontFamily: 'Aleo-Light', 
        fontSize: 18 
    },
    textInput: { 
        fontFamily: 'Aleo-Regular', 
        fontSize: 18, 
        color: colors.palleteDarkGreen 
    },
};

export default AddressInput;