import 'react-native'
import React from 'react'
import SendModalAmountHeader from '../../../../src/components/common/SendModalAmountHeader'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<SendModalAmountHeader />)
	expect(container.children[0]).toMatchSnapshot()
})
