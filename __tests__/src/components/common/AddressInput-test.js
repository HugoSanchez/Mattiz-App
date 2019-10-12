import 'react-native'
import React from 'react'
import AddressInput from '../../../../src/components/common/AddressInput'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<AddressInput />)
	expect(container.children[0]).toMatchSnapshot()
})
