import { makeProps as makePropsAppointment } from '../Appointment/mocks'

export const makeProps = ({
	appointments = [makePropsAppointment(), makePropsAppointment()],
	dayDate = new Date(2017, 0, 1), // 1 Sunday
	handleClick = jest.fn(),
	handleAppointmentDelete = jest.fn()
} = {}) => ({
	appointments,
	dayDate,
	handleClick,
	handleAppointmentDelete
})
