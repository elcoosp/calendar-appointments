import React from 'react'
import { shallow } from 'enzyme'
import Appointment from './index.js'
import { DeleteButton } from './style'

const makeProps = ({
	begin = '10:00',
	end = '12:00',
	title = 'Some appointment',
	handleDelete = jest.fn()
} = {}) => ({ begin, end, title, handleDelete })

describe('<Appointment />', () => {
	test('render begin, end and title props', () => {
		const props = makeProps()
		const wrapper = shallow(<Appointment {...props} />)
		expect(wrapper.contains(props.begin)).toBe(true)
		expect(wrapper.contains(props.end)).toBe(true)
		expect(wrapper.contains(props.title)).toBe(true)
	})

	test('should call handleDelete on ❌ button click', () => {
		const props = makeProps()
		const wrapper = shallow(<Appointment {...props} />)

		wrapper.find(DeleteButton).simulate('click')
		expect(props.handleDelete).toHaveBeenCalled()
	})
})
