import {AsyncStorage} from 'react-native'
import axios from 'axios'
import {encryptData, decryptData} from './helper'


export const getBuilder = (url) => {
	return axios.get(url)
	.then( middleWare )
}

export const postBuilder = async (url, body) => {
	return await axios.post(url, {
		id: await AsyncStorage.getItem('id'),
		data: encryptData(body),
	})
	.then( middleWare )
}

const middleWare = (resp) => {
	return decryptData(resp.data.data)
}