import * as AppointmentsManager from './AppointmentsManager'

const makeMocks = () => {
	const dayHash = 'timestamp hash'
	return {
		dayHash,
		makeDayHash: jest.fn(date => dayHash),
		appointment: ({ start = Date.now(), id = Math.random() } = {}) => ({
			start,
			id
		})
	}
}

describe('AppointmentsManager', () => {
	test(`makeDayHash :: should return a hash corresponding to the timestamp of the given date at 00:00:00`, () => {
		// Setup
		const date = new Date()
		// Act
		const result = AppointmentsManager.makeDayHash(date)
		const parsedResult = new Date(+result)
		// Expect
		expect(typeof result).toBe('string')
		expect(parsedResult.getFullYear()).toEqual(date.getFullYear())
		expect(parsedResult.getMonth()).toEqual(date.getMonth())
		expect(parsedResult.getDay()).toEqual(date.getDay())
		expect(parsedResult.getHours()).toEqual(0)
		expect(parsedResult.getMinutes()).toEqual(0)
		expect(parsedResult.getMilliseconds()).toEqual(0)
	})

	test('add :: should return a new object with added appointments for the given dayHash', () => {
		// Setup
		const mocks = makeMocks()
		const date = new Date()
		const appointment1 = mocks.appointment()
		const appointment2 = mocks.appointment()
		// Act
		const result1 = AppointmentsManager.add(
			date,
			appointment1,
			{},
			mocks.makeDayHash
		)
		const expected1 = { [mocks.dayHash]: [appointment1] }

		const result2 = AppointmentsManager.add(
			date,
			appointment2,
			expected1,
			mocks.makeDayHash
		)
		const expected2 = { [mocks.dayHash]: [appointment1, appointment2] }
		// Expect
		expect(result1).toEqual(expected1)
		expect(result2).toEqual(expected2)
	})

	test(`deleteById :: should return a new object without the appointment matching the id for the given date. Also remove the day hash if there is no more appointments for the day`, () => {
		// Setup
		const mocks = makeMocks()
		const date = new Date()
		const appointment1 = mocks.appointment()
		const appointment2 = mocks.appointment({ start: Date.now() + 50509 })
		const previousAppointments = {
			[mocks.dayHash]: [appointment2, appointment1]
		}
		// Act
		const result = AppointmentsManager.deleteById(
			date,
			appointment2,
			previousAppointments,
			'id',
			mocks.makeDayHash
		)
		const result2 = AppointmentsManager.deleteById(
			date,
			appointment1,
			result,
			'id',
			mocks.makeDayHash
		)
		// Expect
		expect(result).toEqual({
			[mocks.dayHash]: [appointment1]
		})
		expect(result2).toEqual({})
	})

	test(`getDay :: should return all appointment for the given date, ordered with the sorter function`, () => {
		// Setup
		const mocks = makeMocks()
		const date = new Date()
		const appointment1 = mocks.appointment()
		const appointment2 = mocks.appointment({ start: Date.now() + 4531 })
		const previousAppointments = {
			[mocks.dayHash]: [appointment2, appointment1]
		}
		const sorter = (a, b) => (a.start < b.start ? -1 : 1)
		// Act
		const result = AppointmentsManager.getDay(
			date,
			sorter,
			previousAppointments,
			mocks.makeDayHash
		)
		// Expect
		expect(result).toEqual([appointment1, appointment2])
	})
})
