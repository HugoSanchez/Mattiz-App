import { AsyncStorage } from 'react-native';

export const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token
}

export const setUserInMemory = async (user) => {
    console.log('Setting user object in memory. user: ', user)
    return await AsyncStorage.setItem('user', user)
}

export const getUserFromMemory = async () => {
    return await AsyncStorage.getItem('user')
}

export const logOut = async () => {
    return await AsyncStorage.removeItem('token')
}