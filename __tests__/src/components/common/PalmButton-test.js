import 'react-native'
import React from 'react'
import PalmButton from '../../../../src/components/common/PalmButton'
import {render, fireEvent} from '@testing-library/react-native'

test('calls onPress callback when clicked', () => {
	const palmButtonCallback = jest.fn()
	const {container} = render(<PalmButton onPress={palmButtonCallback} />)

	fireEvent.press(container.children[0])

	expect(palmButtonCallback).toHaveBeenCalled()
	expect(container.children[0]).toMatchSnapshot()
})

test('Renders with title', () => {
	const {container} = render(<PalmButton title="Button" />)
	expect(container.children[0]).toMatchSnapshot()
})
