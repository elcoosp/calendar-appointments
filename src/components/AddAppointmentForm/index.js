import React from 'react'
import { Formik } from 'formik'
import P from 'prop-types'

import * as S from './style'
import validation from './validation'

const LabelledInput = ({
	errors,
	touched,
	label,
	name,
	type = 'text',
	...props
} = {}) => {
	const id = 'labelled-input-' + name
	return (
		<S.LabelledInput>
			<S.Label htmlFor={id}>{label}</S.Label>
			<S.Field type={type} name={name} id={id} {...props} />
			{errors[name] && touched[name] && <S.Error>{errors[name]}</S.Error>}
		</S.LabelledInput>
	)
}

LabelledInput.propTypes = {
	errors: P.shape({}).isRequired,
	touched: P.shape({}).isRequired,
	label: P.string.isRequired,
	name: P.string.isRequired,
	type: P.string
}

const timeInputAttributes = {
	type: 'time',
	min: '00:00',
	max: '23:59'
}

const AddAppointmentForm = ({ handleClose, handleSubmit, title }) => {
	return (
		<S.ModalWrapper>
			<S.ModalClose onClick={handleClose} aria-label="Close appointment form">
				&times;
			</S.ModalClose>
			<Formik
				validate={validation}
				initialValues={{ title: '', begin: '', end: '' }}
				onSubmit={handleSubmit}
				render={({ errors, touched }) => (
					<S.Form>
						<S.Title>{title}</S.Title>
						<LabelledInput
							errors={errors}
							touched={touched}
							label="Appointment"
							name="title"
						/>

						<LabelledInput
							errors={errors}
							touched={touched}
							label="Beginning"
							name="begin"
							{...timeInputAttributes}
						/>
						<LabelledInput
							errors={errors}
							touched={touched}
							label="Ending"
							name="end"
							{...timeInputAttributes}
						/>

						<S.SubmitButton type="submit" disabled={Object.keys(errors).length}>
							Create appointment
						</S.SubmitButton>
					</S.Form>
				)}
			/>
		</S.ModalWrapper>
	)
}

AddAppointmentForm.propTypes = {
	handleClose: P.func.isRequired,
	handleSubmit: P.func.isRequired,
	title: P.string.isRequired
}

export default AddAppointmentForm
