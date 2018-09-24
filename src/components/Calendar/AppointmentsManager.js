import { setHours, setMilliseconds, setMinutes } from 'date-fns'

/*
Module en charge de l'ajout, suppression et récupération d'appointments (RDV), sans mutation.
*/

export const getDay = (
	date,
	sorter,
	appointments,
	hashGetter = makeDayHash
) => {
	const dayAppointments = appointments[hashGetter(date)]
	return dayAppointments ? [...dayAppointments].sort(sorter) : []
}

// Crée un "hash" qui correspond au timestamp de la date fournie, à l'heure 00:00:00
export const makeDayHash = date =>
	Date.parse(setMilliseconds(setMinutes(setHours(date, 0), 0), 0)).toString()

export const add = (
	date,
	appointment,
	previousAppointments,
	hashGetter = makeDayHash
) => {
	const dayHash = hashGetter(date)

	return {
		...previousAppointments,
		[dayHash]: (previousAppointments[dayHash] || []).concat(appointment)
	}
}

export const deleteById = (
	date,
	appointment,
	previousAppointments,
	idKey = 'id',
	hashGetter = makeDayHash
) => {
	const dayHash = hashGetter(date)

	if (!previousAppointments[dayHash]) return previousAppointments

	const updatedDayAppointments = previousAppointments[dayHash].filter(
		ap => ap[idKey] !== appointment[idKey]
	)

	if (updatedDayAppointments.length) {
		// Si il existe encore des RDV pour ce jour on conserve le dayHash
		return {
			...previousAppointments,
			[dayHash]: updatedDayAppointments
		}
	} else {
		// Sinon, si on a supprimer le dernier RDV, on retire le dayHash
		const { [dayHash]: _, ...updated } = previousAppointments
		return updated
	}
}
