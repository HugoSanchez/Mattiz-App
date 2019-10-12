import 'react-native'
import React from 'react'
import SendReceiveHeader from '../../../../src/components/common/SendReceiveHeader'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<SendReceiveHeader />)
	expect(container.children[0]).toMatchSnapshot()
})
