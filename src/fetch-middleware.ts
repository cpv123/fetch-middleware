import { Dispatch, GenericAction } from './types';

const fetchMiddleware = 
( { dispatch }: { dispatch: Dispatch }) => 
(next: Dispatch) => 
(action: GenericAction) => {
	if (!action.type.startsWith('@@')) {
		return next(action)
	}

	if (!(action.requestToMake instanceof Promise)) {
		console.warn('Unable to use middleware because request is not a promise')
		return next(action)
	}

	const actionName = action.type.substring(2)

	dispatch({ type: `${actionName}_START` })

	action.requestToMake
		.then(res => {
			dispatch({
				type: `${actionName}_RECEIVE`,
				payload: res,
			})
		}, err => {
			dispatch({
				type: `${actionName}_ERROR`,
				payload: err,
			})
		})
}

export { fetchMiddleware }
