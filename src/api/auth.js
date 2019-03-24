import { AsyncStorage } from 'react-native';
import axios from 'axios';

const URL = 'http://192.168.0.15:3000/api/auth'

    // AUTH API FUNCTIONS //

// CALL "/register" ENDPOINT.
export const authCreateUser = (name, password) => {
    return axios.post(URL + '/register', {name, password})
}

// CALL "/identify" ENDPOINT, RETURNS NAME & ID.
export const identifyUser = (token) => {
    return axios.post(URL + '/identify', {token})
}

// CALL "/login" ENDPOINT, RETURNS OBJECT { auth: bool, token: token }
export const verifyUser = (userID, password) => {
    return axios.post(URL + '/login', { _id: userID, password })
}

    // ASYNCSTORAGE TOKEN FUNCTIONS //

// CHECK IF TOKEN EXISTS, RETURNS BOOLEAN.
export const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token
}

// SET TOKEN IN MEMORY.
export const setTokenInMemory = async (token) => {
    return await AsyncStorage.setItem('token', token)
}

// GET TOKEN. 
export const getTokenFromMemory = async () => {
    return await AsyncStorage.getItem('token')
}

// REMOVE TOKEN.
export const removeTokenFromMemory = async () => {
    return await AsyncStorage.removeItem('token')
}