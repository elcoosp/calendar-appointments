import { setHours, setMinutes, isAfter } from 'date-fns'

const parseHHMM = s => {
	const [hours, minutes] = s.split(':')
	return setMinutes(setHours(new Date(), hours), minutes)
}

const validation = ({ title, begin, end }) => {
	const errors = {}
	!title && (errors.title = 'Required')
	!begin && (errors.begin = 'Required')
	!end && (errors.end = 'Required')

	isAfter(parseHHMM(begin), parseHHMM(end)) &&
		(errors.begin = 'Begin must be before end') &&
		(errors.end = 'End must be after begin')

	return errors
}

export default validation
