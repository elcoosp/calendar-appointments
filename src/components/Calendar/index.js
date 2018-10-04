import React, { Component } from 'react'
import cuid from 'cuid'
import {
	subMonths,
	addMonths,
	format,
	getDaysInMonth,
	addDays,
	setDate
} from 'date-fns'
import { rangeMap } from '../../utils.js'

import * as AppointmentsManager from './AppointmentsManager'
import * as S from './style'
// Components
import Navigation from '../Navigation'
import Day from '../Day'
import AddAppointmentForm from '../AddAppointmentForm'

class Calendar extends Component {
	state = {
		currentDate: new Date(),
		appointments: {},
		form: { isOpen: false, day: null }
	}

	render() {
		return (
			<div>
				{this.renderNavigation()}
				{this.renderMonthGrid()}
				{this.renderForm()}
			</div>
		)
	}

	// Navigation
	renderNavigation = () => (
		<header>
			<Navigation
				handlePreviousMonth={this.goToPreviousMonth}
				currentMonth={format(this.state.currentDate, 'MMMM YYYY')}
				handleNextMonth={this.goToNextMonth}
			/>
		</header>
	)

	goToNextMonth = () =>
		this.setState(prevState => ({
			currentDate: addMonths(prevState.currentDate, 1)
		}))

	goToPreviousMonth = () =>
		this.setState(prevState => ({
			currentDate: subMonths(prevState.currentDate, 1)
		}))

	// MonthGrid
	renderMonthGrid = () => (
		<S.MonthGrid>
			{this.getMonthAppointments().map((day, i) => (
				<Day
					key={i}
					{...day}
					handleAppointmentDelete={this.deleteAppointment}
					handleClick={() => this.openForm(day.dayDate)}
				/>
			))}
		</S.MonthGrid>
	)

	deleteAppointment = (ap, dayDate) =>
		this.setState(prevState => ({
			appointments: AppointmentsManager.deleteById(
				dayDate,
				ap,
				prevState.appointments
			)
		}))

	// Getters for monthly grid rendering
	getDayAppointments = date =>
		AppointmentsManager.getDay(
			date,
			(a, b) => (a.begin < b.begin ? -1 : 1),
			this.state.appointments
		)

	getMonthAppointments = () => {
		const firstMonthDayDate = setDate(this.state.currentDate, 1)
		const monthAppointments = rangeMap(
			getDaysInMonth(this.state.currentDate),
			i => {
				const dayDate = addDays(firstMonthDayDate, i)

				return {
					dayDate,
					appointments: this.getDayAppointments(dayDate)
				}
			}
		)
		return monthAppointments
	}

	// Form
	renderForm = () =>
		this.state.form.isOpen && (
			<AddAppointmentForm
				title={`Add an appointment for the ${format(
					this.state.form.day,
					'D MMMM'
				)}`}
				handleSubmit={this.addAppointment}
				handleClose={this.closeForm}
			/>
		)

	openForm = day =>
		this.setState(_ => ({
			form: { isOpen: true, day }
		}))

	closeForm = () =>
		this.setState(_ => ({
			form: { isOpen: false, day: null }
		}))

	addAppointment = values => {
		this.setState(
			prevState => ({
				appointments: AppointmentsManager.add(
					prevState.form.day,
					{ id: cuid(), ...values },
					prevState.appointments
				)
			}),
			this.closeForm
		)
	}
}

export default Calendar
