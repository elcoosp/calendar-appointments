export const rangeMap = (size, mapper) => {
	let acc = []
	let i = 0
	while (i < size) acc.push(mapper(i++))

	return acc
}
