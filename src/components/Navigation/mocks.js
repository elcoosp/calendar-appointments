export const makeProps = ({
	handlePreviousMonth = jest.fn(),
	currentMonth = 'January',
	handleNextMonth = jest.fn()
} = {}) => ({
	handlePreviousMonth,
	currentMonth,
	handleNextMonth
})
