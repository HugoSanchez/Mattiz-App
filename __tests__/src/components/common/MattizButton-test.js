import 'react-native'
import React from 'react'
import MattizButton from '../../../../src/components/common/MattizButton'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<MattizButton />)
	expect(container.children[0]).toMatchSnapshot()
})
