import { AsyncStorage } from 'react-native';
import axios from 'axios';

const URL = 'http://localhost:3000/api/auth'

    //* Auth API Functions *//

// CALL "/register" ENDPOINT
export const authCreateUser = (name, password) => {
    return axios.post(URL + 'register', {name, password})
}

// CALL "/identify" ENDPOINT, RETURNS NAME & ID.
export const identifyUser = (token) => {
    return axios.post(URL + '/identify', token)
}

// CALL "/login" ENDPOINT, RETURNS OBJECT { auth: bool, token: token }
export const verifyUserAndLogIn = (userID, password) => {
    return axios.post(URL + '/login', {_id: userID, password })
}

    //* AsyncStorage Token Functions *//

// CHECK IF TOKEN EXISTS, RETURNS BOOLEAN.
export const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token
}

// SET TOKEN IN MEMORY.
export const setTokenInMemory = async (token) => {
    console.log('Setting Token object in memory. Token: ', token)
    return await AsyncStorage.setItem('token', token)
}

// GET TOKEN 
export const getUserFromMemory = () => {
    return AsyncStorage.getItem('token')
}

// REMOVE TOKEN
export const logOut = async () => {
    return await AsyncStorage.removeItem('token')
}