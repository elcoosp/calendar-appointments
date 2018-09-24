import React from 'react'
import { shallow } from 'enzyme'
import Appointment from './index.js'
import * as S from './style'
import { makeProps } from './mocks'

describe('<Appointment />', () => {
	test('should render begin, end and title props', () => {
		const props = makeProps()
		const wrapper = shallow(<Appointment {...props} />)
		expect(wrapper.contains(props.begin)).toBe(true)
		expect(wrapper.contains(props.end)).toBe(true)
		expect(wrapper.contains(props.title)).toBe(true)
	})

	test('should call handleDelete on ❌ button click', () => {
		const props = makeProps()
		const wrapper = shallow(<Appointment {...props} />)

		wrapper.find(S.DeleteButton).simulate('click')
		expect(props.handleDelete).toHaveBeenCalledTimes(1)
	})
})
