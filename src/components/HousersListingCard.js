/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const HousersListingCard = props => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>
            {props.listing.name}
          </Text>
        </View>
        <View style={styles.cityContainer}>
          <Text style={styles.cityTextStyle}>
            {props.listing.city}
          </Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={{uri: props.listing.image}}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.amountAndYieldContainer}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountStyle}>
              {props.listing.amount}
            </Text>
            <Text style={styles.investmentTypeStyle}> 
              {props.listing.type}
            </Text>
          </View>
          <View style={styles.yieldContainer}>
            <View style={styles.yieldCircle}>
              <Text style={styles.yieldTextStyle}>
                {props.listing.yield}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailBox}>
            <Text style={styles.detailTitle}>
              {props.listing.investors}
            </Text>
            <Text style={styles.detailSubtitle}>
              Investors
            </Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailTitle}>
              50€
            </Text>
            <Text style={styles.detailSubtitle}>
              Investment
            </Text>
          </View>
          <View style={styles.thirdDetailBox}>
            <Text style={styles.detailTitle}>
              {props.listing.term}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        onPress={props.onDetailPress}
        style={styles.button}>
        <Text style={styles.buttonTextStyle}>
          Details
        </Text>
      </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
  card: {
    height: 500,
    width: 370,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 2,
  },
  cardHeader: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

  },
  titleContainer: {
    flex: 2, 
    justifyContent: 'flex-end', 
    marginBottom: '3%',
  },
  titleStyle: {
    marginLeft: '2%', 
    alignSelf: 'flex-start', 
    fontSize: 26, 
    fontWeight: 'bold',
  },
  cityContainer: {
    flex: 1, 
    justifyContent: 'center', 
    borderTopWidth: 0.2, 
    borderColor: 'gray',
  },
  cityTextStyle: {
    marginLeft: '2%', 
    alignSelf: 'flex-start',
  },
  imageContainer: {
    flex: 3, 
  },
  imageStyle: {
    height: '100%', 
    width: '100%', 
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1.5, 
    backgroundColor: '#FFF',
  },
  amountAndYieldContainer: {
    flex: 2, 
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  amountContainer: {
    flex: 3, 
    justifyContent: 'center', 
    marginLeft: '2%', 
  },
  amountStyle: {
    marginLeft: '5%', 
    alignSelf: 'flex-start', 
    fontSize: 20, 
    fontWeight: 'bold',
  },
  investmentTypeStyle: { 
    fontSize: 16, 
    fontWeight: 'normal',
  },
  yieldContainer: {
    flex: 1, 
    justifyContent: 'center', 
    marginRight: '2%',
  },
  yieldCircle: {
    height: 90, 
    width: 90, 
    borderRadius: 45, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#EEDFDA'
  },
  yieldTextStyle: {
    alignSelf: 'center', 
    fontSize: 24, 
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: '5%',
  },
  detailBox: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRightWidth: 0.2, 
    borderRightColor: 'gray',
  },
  thirdDetailBox: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  detailTitle: {
    marginLeft: '2%', 
    fontSize: 16, 
    fontWeight: 'bold',
  },
  detailSubtitle: {
    marginLeft: '2%', 
    fontSize: 14, 
    fontWeight: 'normal',
  },
  button: {
    flex: 0.8, 
    justifyContent: 'center', 
    backgroundColor: '#D9F7EE', 
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  buttonTextStyle: {
    alignSelf: 'center', 
    fontSize: 20, 
  },
});

export default HousersListingCard;
