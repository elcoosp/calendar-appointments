export const makeProps = ({
	begin = '10:00',
	end = '12:00',
	id = Math.random().toString(),
	title = 'Some appointment',
	handleDelete = jest.fn()
} = {}) => ({ begin, end, title, id, handleDelete })
