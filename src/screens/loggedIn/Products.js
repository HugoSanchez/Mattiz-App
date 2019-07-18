import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    ImageBackground, 
    ScrollView, 
    Dimensions, 
    StyleSheet 
} from 'react-native';

// Components 
import Header from '../../components/common/Header';

//General Styles & Colors
import GS from '../../styles'
import colors from '../../constants/colors'

// Dims. 
const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Products extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Header />
                <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
                    <View style={[ styles.subHeader, { alignItems: 'flex-start', marginLeft: '5%' } ]}>
                        <Text style={{ fontFamily: 'Raleway-SemiBold', fontSize: 18 }}> 
                            // Savings 
                        </Text>
                    </View>

                    <View style={ styles.boxContainer }>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: '4%', paddingTop: '2%' }}>
                                <Text style={{ fontFamily: 'Raleway-Medium', fontSize: 22, color: '#A3D164' }}> 
                                    TOP 
                                    <Text style={{ fontFamily: 'Raleway-Bold', fontSize: 22 }}> 
                                    {' '}UP 
                                    </Text> 
                                </Text> 
                            </View>
                            <View style={{ flex: 1, paddingTop: '5%'}}>
                                <Image 
                                    style={{ height: 100, width: 150, alignSelf: 'center' }}
                                    source={require('../../assets/topUp.png')}
                                /> 
                            </View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'column', paddingBottom: '5%'}}>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                Save every time 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                you spend, by rounding 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                up all of your purchases.
                            </Text>
                        </View>      
                    </View>

                    <View style={ styles.boxContainer }>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: '4%', paddingTop: '2%' }}>
                                <Text style={{ fontFamily: 'Raleway-Medium', fontSize: 22, color: '#A3D164' }}> 
                                    PAY 
                                    <Text style={{ fontFamily: 'Raleway-Bold', fontSize: 22 }}> 
                                    {' '}DAY 
                                    </Text> 
                                </Text> 
                            </View>
                            <View style={{ flex: 1 }}>
                                <Image 
                                    style={{ height: 110, width: 160, alignSelf: 'center', marginTop: '2%', marginLeft: '2%' }}
                                    source={require('../../assets/saving.jpg')}
                                /> 
                            </View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'column', paddingBottom: '5%'}}>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                Specify an amount
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                to be set appart
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                every single pay day.
                            </Text>
                        </View>        
                    </View>

                    <View style={[ styles.subHeader, { alignItems: 'flex-start', marginLeft: '5%' } ]}>
                        <Text style={{ fontFamily: 'Raleway-SemiBold', fontSize: 18 }}> 
                            // Crypto 
                        </Text>
                    </View>

                    <View style={[ styles.boxContainer, { backgroundColor: '#67158C'} ]}>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <Image 
                                    style={{ height: 30, width: 150, alignSelf: 'center', borderRadius: 10 }}
                                    source={{ uri: 'https://bit.ly/2JG1IVv'}}
                                />  
                            </View>
                            <View style={{ flex: 1, paddingLeft: '5%'}}>
                                <Image 
                                    style={{ height: 121, width: 150, borderRadius: 10, alignSelf: 'center' }}
                                    source={require('../../assets/UniswapBack.png')}
                                /> 
                            </View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'column'}}>
                            <Text style={{ fontFamily: 'Raleway-Medium', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '4%', marginTop: '2%' }}>
                                Automated token 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Medium', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '4%'}}>
                                exchange on Ethereum.
                            </Text>
                        </View>      
                    </View>

                    <View style={[ styles.boxContainer ]}>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <Image 
                                    style={{ height: 30, width: 107, alignSelf: 'flex-start', marginLeft: '10%', borderRadius: 10 }}
                                    source={{ uri: 'https://bit.ly/32uYNq1'}}
                                />  
                            </View>
                            <View style={{ flex: 1, paddingLeft: '5%'}}>
                                <Image 
                                    style={{ height: 110, width: 110, borderRadius: 8, alignSelf: 'center', marginLeft: '20%', marginTop: '3%' }}
                                    source={require('../../assets/MakerDAO.png')}
                                /> 
                            </View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'column', paddingBottom: '5%' }}>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                Builders of Dai, the first
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                fully-decentralized
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                stablecoin on Ethereum.
                            </Text>
                        </View>      
                    </View>

                    <View style={ styles.boxContainer }>
                        <ImageBackground 
                            source={require('../../assets/compound.png')} 
                            imageStyle={{borderRadius: 15}}
                            style={{width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Text style={{ fontFamily: 'Raleway-Medium', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '4%', marginTop: '5%'}}>
                                Earn Interests by supplying 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Medium', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '4%' }}>
                                assets to Compound protocol.
                            </Text>
                        </ImageBackground>
                    </View>

                    <View style={[ styles.subHeader, { alignItems: 'flex-start', marginLeft: '5%' } ]}>
                        <Text style={{ fontFamily: 'Raleway-SemiBold', fontSize: 18 }}> 
                            // Arts 
                        </Text>
                    </View>

                    <View style={ styles.boxContainer }>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <Image 
                                    style={{ height: 30, width: 150, alignSelf: 'center' }}
                                    source={{ uri: 'https://bit.ly/2Z1gcVc'}}
                                />  
                            </View>
                            <View style={{ flex: 1}}>
                                <Image 
                                    style={{ height: 100, width: 150, alignSelf: 'center' }}
                                    source={require('../../assets/feralHorses.png')}
                                /> 
                            </View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'column', paddingBottom: '5%' }}>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                Welcome to the 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                biggest community 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '4%' }}>
                                of art co-owners.
                            </Text>
                        </View>      
                    </View>

                    <View style={ styles.boxContainer }>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <View style={{ flex: 1, justifyContent: 'center'}}>
                                <Image 
                                    style={{ height: 15, width: 150, alignSelf: 'center', marginLeft: '2%' }}
                                    source={require('../../assets/MasterWorks.png')}
                                />  
                            </View>
                            <View style={{ flex: 1}}>
                                <Image 
                                    style={{ height: 110, width: 155, borderRadius: 8, alignSelf: 'center', marginTop: '2%', marginLeft: '10%' }}
                                    source={{uri:'https://bit.ly/2xWLlx3'}}
                                />
                            </View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'column', paddingBottom: '10%' }}>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '5%' }}>
                                Own a piece of one 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '5%'}}>
                                of Andy Warhol’s 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#000', textAlign: 'auto', marginLeft: '5%'}}>
                                most iconic images.
                            </Text>
                        </View>      
                    </View>

                    <View style={[ styles.boxContainer, { backgroundColor: '#010835'} ]}>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Image 
                                    style={{ height: 30, width: 60, alignSelf: 'flex-start', marginLeft: '10%' }}
                                    source={require('../../assets/OtisLogo.png')}
                                />  
                            </View>
                            <View style={{ flex: 1}}>
                                <Image 
                                    style={{ height: 110, width: 80, borderRadius: 8, alignSelf: 'center', marginLeft: '50%', marginTop: '3%'}}
                                    source={require('../../assets/otisE.png')}
                                />
                            </View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'column', paddingBottom: '10%' }}>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '5%' }}>
                                Ability to invest in contemporary
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '5%'}}>
                                 art, sneakers, and collectibles
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '5%'}}>
                                for as little as $25.
                            </Text>
                        </View>     
                    </View>

                    <View style={[ styles.subHeader, { alignItems: 'flex-start', marginLeft: '5%' } ]}>
                        <Text style={{ fontFamily: 'Raleway-SemiBold', fontSize: 18 }}> 
                            // Real Estate 
                        </Text>
                    </View>

                    <View style={[ styles.boxContainer, { backgroundColor: '#FB9482'} ]}>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Image 
                                    style={{ height: 30, width: 90, alignSelf: 'flex-start', marginLeft: '3%' }}
                                    source={{ uri: 'https://bit.ly/32CvrpK'}}
                                />  
                            </View>
                            <View style={{ flex: 1}}>
                                <Image 
                                    style={{ height: 110, width: 110, borderRadius: 8, alignSelf: 'center', marginLeft: '30%', marginTop: '3%'}}
                                    source={{ uri: 'https://bit.ly/30JlS6H'}}
                                />
                            </View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'column', paddingBottom: '10%' }}>
                            <Text style={{ fontFamily: 'Raleway-Medium', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '5%' }}>
                                Unique, we’re the leading 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Medium', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '5%'}}>
                                pan-european platform 
                            </Text>
                            <Text style={{ fontFamily: 'Raleway-Medium', fontSize: 16, color: '#FFF', textAlign: 'auto', marginLeft: '5%'}}>
                                for real estate investments.
                            </Text>
                        </View>     
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#F5F5F5',
    },
    subHeader: { 
        height: height * 0.05, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    boxContainer: {
        height: height * 0.15,
        width: width * 0.95,
        backgroundColor: '#FFF',
        margin: 5,
        marginLeft: '2.5%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 2,
    }
})