import React, { Component } from 'react';
import { 
    View, 
    Modal,
    Dimensions, 
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import SendAndReceiveEth from './SendAndReceiveEth';

import {
    setEthRenderForm,
} from '../actions';

// Dims. 
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

// Props:
// @ isVisible:    - Required. Boolean
// @ onModalClose: - Required. Function to execute.

class SendModal extends Component {

    render() {

        const {
            modalContainer,
            topContainer,
            formContainer,
            closeContainer,
            closeSlider
        } = compStyles;

        const {
            isVisible,
            setEthRenderForm
        } = this.props;

        return (
            <Modal 
                animationType="slide" 
                transparent={true} 
                visible={isVisible}
            >
                <View style={ modalContainer }>

                    <View style={ formContainer }>
                        <View style={ closeContainer }>
                            <TouchableOpacity 
                                onPress={() => setEthRenderForm(false)}
                                style={ closeSlider }>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 8 }}>
                            <SendAndReceiveEth
                                onRequestClose={ this.props.onRequestClose }
                                onModalClose={() => setEthRenderForm(false)} 
                            />
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }
}

const compStyles = {
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    topContainer: {
        height: height,
        width: width,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    formContainer: {
        height: height,
        width: width, 
        backgroundColor: '#FFF', 
        borderRadius: 25
    },
    closeContainer: { 
        flex: 0.5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    closeSlider: { 
        width: width * 0.10, 
        borderRadius: 25,
        borderWidth: 2, 
        borderColor: 'lightgray'
    },
};

const mapStateToProps = state => {
    const { showSendForm } = state.ethTx;
    return { showSendForm }
}

const mapDispatchtoProps = dispatch => ({    
    setEthRenderForm: bool => dispatch(setEthRenderForm(bool)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(SendModal);
