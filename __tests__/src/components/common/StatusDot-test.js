import 'react-native'
import React from 'react'
import StatusDot from '../../../../src/components/common/StatusDot'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<StatusDot />)
	expect(container.children[0]).toMatchSnapshot()
})
