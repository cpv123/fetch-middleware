export const fetchAction = (type, requestToMake) => ({
	type: `@@${type}`,
	requestToMake,
})
