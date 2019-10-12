import 'react-native'
import React from 'react'
import CustomCard from '../../../../src/components/common/CustomCard'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<CustomCard />)
	expect(container.children[0]).toMatchSnapshot()
})
