import React, { PureComponent } from 'react'
import { format } from 'date-fns'
import P from 'prop-types'

import Appointment, { appointmentPropTypes } from '../Appointment'
import * as S from './style'

class Day extends PureComponent {
	render() {
		const {
			appointments,
			dayDate,
			handleClick,
			handleAppointmentDelete
		} = this.props
		return (
			<S.Wrapper>
				<S.DayDate onClick={handleClick}>{format(dayDate, 'D ddd')}</S.DayDate>
				{!!appointments.length && (
					<S.AppointmentsList>
						{appointments.map(ap => (
							<Appointment
								key={ap.id}
								handleDelete={() => handleAppointmentDelete(ap, dayDate)}
								{...ap}
							/>
						))}
					</S.AppointmentsList>
				)}
			</S.Wrapper>
		)
	}
}

Day.propTypes = {
	appointments: P.arrayOf(P.shape(appointmentPropTypes)).isRequired,
	dayDate: P.instanceOf(Date).isRequired,
	handleClick: P.func.isRequired,
	handleAppointmentDelete: P.func.isRequired
}

export default Day
