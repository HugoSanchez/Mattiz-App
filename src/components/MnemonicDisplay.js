import React from 'react';
import { View, Text } from 'react-native';
import CustomCard from './common/CustomCard';

const MnemonicDisplay = props => {
    console.log(props.mnemonic[0])
    return (
        <View style={{ height: '100%', width: '100%'}}>
            <View style={ styles.container }>
                 <CustomCard>
                    <Text style={styles.textStyle}> 1. {props.mnemonic[0]}</Text>
                </CustomCard>

                <CustomCard>
                    <Text style={styles.textStyle}> 2. {props.mnemonic[1]}</Text>
                </CustomCard>

                <CustomCard>
                    <Text style={styles.textStyle}> 3. {props.mnemonic[2]}</Text>
                </CustomCard>
            </View>

            <View style={ styles.container }>
                <CustomCard>
                    <Text style={styles.textStyle}> 4. {props.mnemonic[3]}</Text>
                </CustomCard>
                                    
                <CustomCard>
                    <Text style={styles.textStyle}> 5. {props.mnemonic[4]}</Text>
                </CustomCard>

                <CustomCard>
                    <Text style={styles.textStyle}> 6. {props.mnemonic[5]}</Text>
                </CustomCard>
            </View>

            <View style={ styles.container }>
                <CustomCard>
                    <Text style={styles.textStyle}> 7. {props.mnemonic[6]}</Text>
                </CustomCard>
                                    
                <CustomCard>
                    <Text style={styles.textStyle}> 8. {props.mnemonic[7]}</Text>
                </CustomCard>

                <CustomCard>
                    <Text style={styles.textStyle}> 9. {props.mnemonic[8]}</Text>
                </CustomCard>
            </View>

            <View style={ styles.container }>
                <CustomCard>
                    <Text style={styles.textStyle}> 10. {props.mnemonic[9]}</Text>
                </CustomCard>

                <CustomCard>
                    <Text style={styles.textStyle}> 11. {props.mnemonic[10]}</Text>
                </CustomCard>

                <CustomCard>
                    <Text style={styles.textStyle}> 12. {props.mnemonic[11]}</Text>
                </CustomCard>
            </View>            
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        marginTop: 5,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: 'Raleway',
        fontSize: 16
    }
};

export default MnemonicDisplay;