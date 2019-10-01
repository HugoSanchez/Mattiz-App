import 'react-native'
import configureMockStore from 'redux-mock-store'
import React from 'react'
import SignUpForm from '../src/screens/loggedOut/SignUpForm'
import {Provider} from 'react-redux'
import {render, fireEvent} from '@testing-library/react-native'

const mockStore = configureMockStore([])
store = mockStore({
	auth: {user: {}, token: 'token', error: false},
})

test('SignUpForm component', () => {
	const {
		queryByText,
		queryByPlaceholderText,
		queryByTestId,
		container,
	} = render(
		<Provider store={store}>
			<SignUpForm />
		</Provider>,
	)

	fireEvent.press(queryByText('Sign Up'))
	const userNameInput = queryByPlaceholderText("What's your name?")

	expect(userNameInput).toBeTruthy()
	expect(queryByText('Sign Up')).toBeNull()

	fireEvent.changeText(userNameInput, 'Marju')
	fireEvent.press(queryByText('Continue'))
	const passwordInput = queryByPlaceholderText('Choose your password')

	expect(passwordInput).toBeTruthy()

	fireEvent.changeText(passwordInput, '42')
	fireEvent.press(queryByText('Continue'))
	const confirmInput = queryByPlaceholderText('Confirm password')

	expect(confirmInput).toBeTruthy()

	fireEvent.changeText(confirmInput, '42')
	fireEvent.press(queryByText('Sign up!'))

	expect(queryByText('Sign up!')).toBeNull()
	expect(queryByTestId('LoadingScreen')).toBeTruthy()
	expect(container.children[0]).toMatchSnapshot()
})
