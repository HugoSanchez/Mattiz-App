import React, { Component } from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';
import {  Input } from 'react-native-elements';
import { connect } from 'react-redux';

// Components.
import LoadingScreen from '../../components/LoadingScreen';
import CustomCard from '../../components/common/CustomCard';
import MattizButton from '../../components/common/MattizButton';

// Auth & Actions.
import { verifyUser } from '../../api/auth';
import { loadPlaidInfo } from '../../actions';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            loading: false,
            error: '',
            isFocused: false 
        }
    }

    componentWillMount() {
        // TODO:
        // Render welcome message with user name.
        // Render error message.
    }

    onButtonPress() {
        // Clean input and set spinner.
        this.setState({ password: null, loading: true});
        // Call '/login' endpoint with password and user id.
        verifyUser(this.props.user._id, this.state.password).then(res => {
            // If succesful,
            if (res.data.auth) {
                // Fire Plaid API calls.
                this.props.loadPlaidInfo();
                // Navigate user inside the app.
                this.props.navigation.navigate('Dashboard')
            } else {
                // In not, re-render form and show error message.
                this.setState({ loading: false, error: 'Invalid credentials, please try again.'})
            }
        })
    }

    render() {
        const { container, input, viewStyle } = styles;

        if ( this.state.loading ) {
            return (
                <View style={ container }>
                    <LoadingScreen />
                </View>
            );
        }
        return (
            <View style={ container }>
                <ImageBackground 
                    source={require('../../assets/LoginForm.png')} 
                    style={{ width: '100%', height: '100%', flex: 1 }}
                    resizeMode={'cover'}
                >
                    <Image 
                        source={require('../../assets/MattizLogo.png')} 
                        style={{ width: 250, height: 250, alignSelf: 'center', marginTop: 15 }}
                    />
                    <View style={{ alignItems: 'center'}}>
                        <CustomCard 
                            style={{ margin: 10, marginTop: 0, height: 55, borderRadius: 10 }}
                            elevated={ this.state.isFocused ? true : false }
                        >
                            <Input 
                                placeholder="Password ..."
                                inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
                                placeholderTextColor='gray'
                                secureTextEntry={true}
                                onChangeText={ value => this.setState({ password: value }) }
                                fontStyle={ this.state.password? 'italic' : 'normal' }
                                onFocus={() => this.setState({ isFocused: true })}
                                style={ input }
                            />
                        </CustomCard>
                        <View style={{ marginTop: this.state.isFocused ? 10 : 380, alignSelf: 'stretch' }}>
                            <MattizButton 
                                title={'Log In! '}
                                titleStyle={{ color: '#040026'}}
                                buttonStyle={{ height: 55, borderRadius: 10 }}
                                onPress={ () => this.onButtonPress()}
                                linearColor={'rgba(214, 213, 213, 1)'}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        backgroundColor: '#fff'
    },
    input: {
        height: 50,
        backgroundColor: '#ededed',
        margin: 5,
        padding: 20
    },
    viewStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 2,
        margin: 5, 
        height: 50,
    },
})

const mapDispatchtoProps = dispatch => ({
    loadPlaidInfo: () => dispatch(loadPlaidInfo()),
});

const MapStateToProps = state => {
    const { user, token, error } = state.auth
    const loading = state.plaid
    return {
        user,
        token,
        error,
        loading
    };
}

export default connect(MapStateToProps, mapDispatchtoProps)(LoginForm);