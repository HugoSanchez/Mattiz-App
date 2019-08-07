import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from '../../styles';
import colors from '../../constants/colors';


// Props:
// @ flex:          - Optional. Wrapping container flex.
// @ onPressOne:    - Required. Function to be executed on press 1.
// @ onPressTwo:    - Required. Function to be executed on press 2.
// @ onPressThree:  - Required. Function to be executed on press 3.
// @ onPressFour:   - Required. Function to be executed on press 4.
// @ onPressFive:   - Required. Function to be executed on press 5.
// @ onPressSix:    - Required. Function to be executed on press 6.
// @ onPressSeven:  - Required. Function to be executed on press 7.
// @ onPressEight:  - Required. Function to be executed on press 8.
// @ onPressNine:   - Required. Function to be executed on press 9.
// @ onPressComa:   - Required. Function to be executed on press ','.
// @ onPressZero:   - Required. Function to be executed on press 0.
// @ onPressDelete: - Required. Function to be executed on press delete.


const NumbersKeyboard = props => {

    const { container, rowStyle } = compStyles;
    
    return (
        <View style={[ container, { flex: props.flex }]}>

            <View style={ rowStyle }>
                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressOne }
                >
                    <Text style={ styles.smallNumberStyle }>1</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressTwo }
                >
                    <Text style={ styles.smallNumberStyle }>2</Text>
                </TouchableOpacity>
                        
                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressThree }
                >
                    <Text style={ styles.smallNumberStyle }>3</Text>
                </TouchableOpacity>
            </View>

            <View style={ rowStyle }>
                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressFour }
                >
                    <Text style={ styles.smallNumberStyle }>4</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressFive }
                >
                    <Text style={ styles.smallNumberStyle }>5</Text>
                </TouchableOpacity>
            
                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressSix }
                >
                    <Text style={ styles.smallNumberStyle }>6</Text>
                </TouchableOpacity>
            </View>

            <View style={ rowStyle }>
                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressSeven }
                >
                    <Text style={ styles.smallNumberStyle }>7</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressEight }
                >
                    <Text style={ styles.smallNumberStyle }>8</Text>
                </TouchableOpacity>
            
                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressNine }
                >
                    <Text style={ styles.smallNumberStyle }>9</Text>
                </TouchableOpacity>
            </View>

            <View style={ rowStyle }>
                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressComa }
                >
                    <Text style={ styles.smallNumberStyle }>,</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressZero }
                >
                    <Text style={ styles.smallNumberStyle }>0</Text>
                </TouchableOpacity>
            
                <TouchableOpacity 
                    style={ styles.container }
                    onPress={ props.onPressDelete }
                >
                    <Icon 
                        name={'delete'}
                        size={20} 
                        color={colors.primaryBlue}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const compStyles = {
    container: { 
        flex: 20, 
        alignSelf: 'stretch',
        margin: '5%'
    },
    rowStyle: { 
        flex: 1, 
        flexDirection: 'row', 
        alignSelf: 'stretch' 
    }
}

export default NumbersKeyboard;