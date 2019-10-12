import 'react-native'
import React from 'react'
import Header from '../../../../src/components/common/Header'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<Header />)
	expect(container.children[0]).toMatchSnapshot()
})
