import { AsyncStorage } from 'react-native';

export const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token
}

export const logIn = async () => {
    const token = 'example-token'
    return await AsyncStorage.setItem('token', token)
}

export const logOut = async () => {
    return await AsyncStorage.removeItem('token')
}