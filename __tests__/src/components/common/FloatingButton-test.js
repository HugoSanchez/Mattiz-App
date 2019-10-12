import 'react-native'
import React from 'react'
import FloatingButton from '../../../../src/components/common/FloatingButton'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<FloatingButton />)
	expect(container.children[0]).toMatchSnapshot()
})
