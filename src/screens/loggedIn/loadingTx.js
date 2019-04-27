import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';


import LoadingScreen from '../../components/LoadingScreen';

class loadingTx extends Component {

    componentWillMount() {

    }

    render() {

            return (
                <View style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                        <LoadingScreen>
                            <Text style={ styles.messageText }>
                                Sending Transaction...
                                {
                                    this.props.message
                                }
                            </Text>
                        </LoadingScreen>
                    </View>
                </View>
            );
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    messageText: {
        color: '#A3D164', 
        fontFamily: 'Raleway',
        fontSize: 22,
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30
    },
});

const MapStateToProps = state => {
    const { loading } = state.ethTx;
    return {
        loading,
    };
}

export default connect(MapStateToProps, {})(loadingTx);