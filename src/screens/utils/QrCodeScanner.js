import React, { Component } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';

import PalmButton from '../../components/common/PalmButton';

import { setAddressInReduxState } from '../../actions'

import colors from '../../constants/colors';
class QrCodeScanner extends Component {
    constructor(props){
        super(props);

        this.state = { 
            loading: false
        }
    }

    onBarCodeRead = data => {
        // Set address.
        this.props.setAddressInReduxState(data)
        // Navigate back to Dashboard.
        this.props.navigation.navigate('Dashboard')
    }

    render() {

        const {
            navigation
        } = this.props;

        return (
            <View style={ styles.container }>

                <RNCamera 
                    ref={ref => {this.camera = ref;}}
                    onBarCodeRead={data => this.onBarCodeRead(data.data)}
                    style={{ flex: 1 }}
                >
                    <View style={ styles.top }   />

                    <View style={ styles.right } />

                    <View style={ styles.left }  />

                    <View style={ styles.bottom }>
                        <View style={{ position: 'absolute', bottom: '10%', width: '100%'}}>
                            <PalmButton 
                                title={'Back'}
                                backgroundColor={colors.palleteLightGreen}
                                onPress={ () => navigation.navigate('Dashboard')}
                            />
                        </View>
                    </View>

                </RNCamera>
            </View>
        );
    }
}

const styles = {
    container: { 
        flex: 1, 
        alignSelf: 'stretch', 
        justifyContent: 'center' 
    }, 
    top: { 
        position: 'absolute', 
        top: 0, 
        width: '100%', 
        height: '20%', 
        backgroundColor: 'rgba(0,0,0, 0.7)'
    },
    right: { 
        position: 'absolute', 
        top: '20%', 
        right: 0, 
        width: '5%', 
        height: '80%', 
        backgroundColor: 'rgba(0,0,0, 0.7)'
    },
    left: { 
        position: 'absolute', 
        top: '20%', 
        left: 0, 
        width: '5%', 
        height: '80%', 
        backgroundColor: 'rgba(0,0,0, 0.7)'
    }, 
    bottom: { 
        position: 'absolute', 
        bottom: 0, 
        right: '5%', 
        left: '5%', 
        width: '90%', 
        height: '40%', 
        backgroundColor: 'rgba(0,0,0, 0.7)', 
    }
}

const mapDispatchToProps = dispatch => ({
    setAddressInReduxState: address => {
        dispatch(setAddressInReduxState(address))},
});

const mapStateToProps = state => {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScanner);