import React from 'react'
import { shallow } from 'enzyme'
import Navigation from './index.js'
import * as S from './style'
import { makeProps } from './mocks'

describe('<Navigation />', () => {
	test('should display currentMonth prop', () => {
		const props = makeProps()
		const wrapper = shallow(<Navigation {...props} />)

		expect(wrapper.contains(props.currentMonth)).toBe(true)
	})

	test('should call handlePreviousMonth and handleNextMonth', () => {
		const props = makeProps()
		const wrapper = shallow(<Navigation {...props} />)

		const navItems = wrapper.find(S.NavItem)

		navItems.first().simulate('click')
		navItems.first().simulate('click')

		navItems.last().simulate('click')
		navItems.last().simulate('click')
		expect(props.handlePreviousMonth).toHaveBeenCalledTimes(2)
		expect(props.handleNextMonth).toHaveBeenCalledTimes(2)
	})
})
