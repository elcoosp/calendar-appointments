export const makeProps = ({
	handleClose = jest.fn(),
	handleSubmit = jest.fn(),
	title = 'Add an appointment for the 16 September'
} = {}) => ({
	handleClose,
	handleSubmit,
	title
})
