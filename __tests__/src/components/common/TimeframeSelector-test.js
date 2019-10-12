import 'react-native'
import React from 'react'
import TimeframeSelector from '../../../../src/components/common/TimeframeSelector'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<TimeframeSelector />)
	expect(container.children[0]).toMatchSnapshot()
})
