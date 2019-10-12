import 'react-native'
import React from 'react'
import NumbersKeyboard from '../../../../src/components/common/NumbersKeyboard'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<NumbersKeyboard />)
	expect(container.children[0]).toMatchSnapshot()
})
