import 'react-native'
import React from 'react'
import DashboardItem from '../../../../src/components/common/DashboardItem'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<DashboardItem />)
	expect(container.children[0]).toMatchSnapshot()
})
