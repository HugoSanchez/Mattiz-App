import 'react-native'
import React from 'react'
import FeeAndBalanceCard from '../../../../src/components/common/FeeAndBalanceCard'
import {render, fireEvent} from '@testing-library/react-native'

test('Renders with title', () => {
	const {container} = render(<FeeAndBalanceCard />)
	expect(container.children[0]).toMatchSnapshot()
})
