import { ActionCreator, FetchAction } from './types'

export const fetchAction: ActionCreator<FetchAction> = (
	type: string,
	requestToMake: Promise<any>
) => ({
	type: `@@${type}`,
	requestToMake,
})
