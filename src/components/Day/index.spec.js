import React from 'react'
import { shallow } from 'enzyme'

import Day from './index.js'
import Appointment from '../Appointment'
import * as S from './style'
import { makeProps } from './mocks'

describe('<Day />', () => {
	test('should render the dayDate formatted and a list of appointments', () => {
		const props = makeProps()
		const wrapper = shallow(<Day {...props} />)

		expect(wrapper.contains('1 Sun')).toBe(true)

		expect(
			wrapper
				.find(S.AppointmentsList)
				.containsAllMatchingElements([
					<Appointment {...props.appointments[0]} />,
					<Appointment {...props.appointments[1]} />
				])
		).toBe(true)
	})

	test('should call handleClick on DayDate click', () => {
		const props = makeProps()
		const wrapper = shallow(<Day {...props} />)

		wrapper.find(S.DayDate).simulate('click')
		expect(props.handleClick).toHaveBeenCalledTimes(1)
	})

	test('should call handleAppointmentDelete...', () => {
		// Todo
	})
})
