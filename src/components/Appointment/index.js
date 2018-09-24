import React from 'react'
import P from 'prop-types'
import * as S from './style'

const Appointment = ({ begin, end, title, handleDelete }) => (
	<S.Wrapper>
		<S.DeleteButton onClick={handleDelete}>&times;</S.DeleteButton>
		<time>{begin}</time> {' - '}
		<time>{end}</time>
		<S.Title>{title}</S.Title>
	</S.Wrapper>
)

Appointment.propTypes = {
	begin: P.string.isRequired,
	end: P.string.isRequired,
	title: P.string.isRequired,
	handleDelete: P.func.isRequired
}

export default Appointment
