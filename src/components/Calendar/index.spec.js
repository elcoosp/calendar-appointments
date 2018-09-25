import React from 'react'
import { shallow } from 'enzyme'
import { isBefore, isSameMonth, isSameDay } from 'date-fns'
import Navigation from '../Navigation'
import AddAppointmentForm from '../AddAppointmentForm'
import Day from '../Day'
import Calendar from './index.js'
import * as S from './style'
import Appointment from '../Appointment'

describe('<Day />', () => {
	test('should render Navigation, Day and MonthGrid components, but not AddAppointmentForm', () => {
		const wrapper = shallow(<Calendar />)

		expect(wrapper.find(Navigation).exists()).toBe(true)
		expect(wrapper.find(Day).exists()).toBe(true)
		expect(wrapper.find(S.MonthGrid).exists()).toBe(true)
		expect(wrapper.find(AddAppointmentForm).exists()).toBe(false)
	})

	test('should render AddAppointmentForm when triggering handleClick prop on a Day. When triggering handleClose on AddAppointmentForm should not render it', () => {
		const wrapper = shallow(<Calendar />)

		wrapper
			.find(Day)
			.first()
			.props()
			.handleClick()

		expect(wrapper.find(AddAppointmentForm).exists()).toBe(true)

		wrapper
			.find(AddAppointmentForm)
			.first()
			.props()
			.handleClose()

		expect(wrapper.find(AddAppointmentForm).exists()).toBe(false)
	})

	test('should change currentDate when triggering handlePreviousMonth/handleNextMonth', () => {
		const wrapper = shallow(<Calendar />)
		const getNavCurrentMonthProp = () =>
			wrapper
				.find(Navigation)
				.first()
				.props().currentMonth

		const initCurrentMonth = getNavCurrentMonthProp()
		wrapper
			.find(Navigation)
			.first()
			.props()
			.handlePreviousMonth()

		const previousMonth = getNavCurrentMonthProp()
		expect(isBefore(previousMonth, initCurrentMonth)).toBe(true)

		wrapper
			.find(Navigation)
			.first()
			.props()
			.handleNextMonth()

		const nextMonth = getNavCurrentMonthProp()
		expect(isSameMonth(initCurrentMonth, nextMonth)).toBe(true)
	})

	test('should add an appointment when AddAppointmentForm handleSubmit is triggered and delete it when the handleDelete function is triggered', () => {
		const wrapper = shallow(<Calendar />)
		const day = new Date()
		wrapper.setState({ form: { isOpen: true, day } })
		const appointment = {
			begin: '10:00',
			end: '12:00',
			id: Math.random().toString(),
			title: 'Some appointment'
		}

		wrapper
			.find(AddAppointmentForm)
			.first()
			.props()
			.handleSubmit(appointment)

		const findAppointmentWrapper = () =>
			wrapper
				.find(Day)
				.filterWhere(node => isSameDay(node.prop('dayDate'), day))
				.first()
				.dive()
				.find(Appointment)

		const appointmentWrapper = findAppointmentWrapper()

		const { handleDelete, ...appointmentData } = appointmentWrapper.props()
		expect(appointmentData).toEqual(appointment)
		appointmentWrapper.props().handleDelete()
		expect(findAppointmentWrapper().exists()).toBe(false)
	})
})
