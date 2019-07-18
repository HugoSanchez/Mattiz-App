import React, { Component } from 'react'; 
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Text, View, Image, Dimensions, StyleSheet, Platform } from 'react-native';

import colors from '../constants/colors'
import GS from '../styles'

const { width: screenWidth } = Dimensions.get('window')

const imageData = [
    {
        title: '59.39€',
        subtitle: '+15.3%',
        uri: 'https://bit.ly/2JFhePW',
        providerUri: 'https://bit.ly/2JCIXCg'
    },
    {
        title: '298.28€',
        subtitle: '+10.2%',
        uri: 'https://bit.ly/2XS2rXr',
        providerUri: 'https://bit.ly/2Y9J7sK'
    },
    {
        title: '559.02€',
        subtitle: '+23.56%',
        uri: 'https://bit.ly/2HkxfwF',
        providerUri: 'https://bit.ly/2JCIXCg'
    }
]

export default class ArtSlider extends Component {

    _renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.uri }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={{ flexDirection: 'row', height: screenWidth * 0.12, backgroundColor: '#FFF'}}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image 
                            style={{ height: screenWidth * 0.12, width: screenWidth * 0.25, resizeMode: 'cover' }}
                            source={{ uri: item.providerUri}}
                        />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: '1%' }}>
                        <Text style={[GS.extraSmallLightNumber, {margintTop: 20}]}>
                            { item.title }
                        </Text>
                        <Text style={[GS.extraSmallBoldNumber, {color: colors.numbersGreen, fontSize: 14 }]} >
                            { item.subtitle }
                        </Text>
                    </View>
                    
                </View>
            </View>
        );
    }

    render () {
        return (
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth * 0.6}
                itemWidth={screenWidth * 0.5}
                data={imageData}
                renderItem={this._renderItem}
                firstItem={1}
                hasParallaxImages={true}
            />
        );
    }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.6,
    marginTop: '10%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 2
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
      color: 'white'
  }
})