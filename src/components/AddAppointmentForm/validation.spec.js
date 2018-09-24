import validation from './validation'
const mocks = {
	inputValues: ({ title = '', begin = '', end = '' } = {}) => ({
		title,
		begin,
		end
	})
}

describe(`Validation handler of AddAppointmentForm component`, () => {
	test('should signal empty keys as required', () => {
		expect(validation(mocks.inputValues())).toEqual({
			title: 'Required',
			begin: 'Required',
			end: 'Required'
		})
	})

	test(`should signal begin hour must be before end hour`, () => {
		expect(
			validation(mocks.inputValues({ begin: '09:00', end: '08:00' }))
		).toEqual({
			begin: 'Begin must be before end',
			end: 'End must be after begin',
			title: 'Required'
		})
	})
})
