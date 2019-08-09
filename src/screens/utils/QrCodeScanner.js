import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import MattizButton from '../../components/common/MattizButton';

import { RNCamera } from 'react-native-camera';

class QrCodeScanner extends Component {
    constructor(props){
        super(props);

        this.state = { 
            loading: false
        }
    }

    onBarCodeRead = data => {
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
                    onBarCodeRead={data => console.log('Data: ', data)}
                    style={{ flex: 1 }}
                >
                    <View style={ styles.top }>

                    </View>

                    <View style={ styles.right }>

                    </View>

                    <View style={ styles.left }>

                    </View>

                    <View style={ styles.bottom }>
                        <MattizButton 
                            title={'Back'}
                            onPress={ () => navigation.navigate('Dashboard')}
                        />
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
        backgroundColor: 'rgba(255,255,255, 0.1)'
    },
    right: { 
        position: 'absolute', 
        top: '20%', 
        right: 0, 
        width: '5%', 
        height: '80%', 
        backgroundColor: 'rgba(255,255,255, 0.1)'
    },
    left: { 
        position: 'absolute', 
        top: '20%', 
        left: 0, 
        width: '5%', 
        height: '80%', 
        backgroundColor: 'rgba(255,255,255, 0.1)'
    }, 
    bottom: { 
        position: 'absolute', 
        bottom: 0, 
        right: '5%', 
        left: '5%', 
        width: '90%', 
        height: '20%', 
        backgroundColor: 'rgba(255,255,255, 0.1)', 
        justifyContent: 'center'
    }

}

export default QrCodeScanner;