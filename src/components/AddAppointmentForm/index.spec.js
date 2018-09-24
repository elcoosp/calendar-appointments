import React from 'react'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import AddAppointmentForm from './index.js'
import * as S from './style'
import { makeProps } from './mocks'

describe('<AddAppointmentForm />', () => {
	test('should display the title props', () => {
		const props = makeProps()
		const wrapper = shallow(<AddAppointmentForm {...props} />)

		const hasTitle = wrapper
			.find(Formik)
			.dive()
			.contains(props.title)
		expect(hasTitle).toBe(true)
	})

	test('should call handleClose on close button click', () => {
		const props = makeProps()
		const wrapper = shallow(<AddAppointmentForm {...props} />)

		wrapper.find(S.ModalClose).simulate('click')
		expect(props.handleClose).toHaveBeenCalledTimes(1)
	})

	test('should call handleSubmit on submit button click', () => {
		const props = makeProps()
		const wrapper = shallow(<AddAppointmentForm {...props} />)

		wrapper.find(Formik).simulate('submit')
		expect(props.handleSubmit).toHaveBeenCalledTimes(1)
	})
})
