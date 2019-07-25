import React from 'react';
import { 
    View, 
    Text, 
    Modal,
    Dimensions, 
    TouchableOpacity 
} from 'react-native';

import colors from '../constants/colors';
import styles from '../styles';

// Number parser 
const numeral = require('numeral');

// Dims
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

// Props:
// @ modalVisible: - Required. Boolean.


const SendFormModal = props => {
    return (
        <Modal animationType="slide" transparent={true} visible={props.modalVisible}>

            <View style={ compStyles.container }>

                <View style={ compStyles.topContainer }>
                </View>
                <View style={ compStyles.formContainer }>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text sytle={ styles.bigLightTitle }> 
                            Transfer! 
                        </Text>
                    </View>

                    <View style={{ flex: 2 }}>

                    </View>

                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity 
                            style={{ borderWidth: 1, borderColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}
                            onPress={ props.onPress }>
                            <Text sytle={{ color: '#FFF' }}> Close! </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 2 }}>

                    </View>

                    <View style={{ flex: 1 }}>

                    </View>
                </View>
            </View>

        </Modal>
    );
}

const compStyles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    topContainer: {
        height: height * 0.22,
        width: width,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    formContainer: {
        height: height * 0.78,
        width: width, 
        backgroundColor: '#FFF', 
        borderRadius: 25
    }
};

export default SendFormModal;