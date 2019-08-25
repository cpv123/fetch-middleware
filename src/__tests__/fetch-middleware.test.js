import { fetchMiddleware } from '..'

describe('the fetchMiddleware', () => {
	const store = {
		dispatch: jest.fn(),
	}

	const next = jest.fn()

	beforeEach(() => {
		jest.resetAllMocks()
	})

	describe('when it receives an ordinary action', () => {
		const action = { type: 'ORDINARY_ACTION' }
		test('ignores the action', () => {
			fetchMiddleware(store)(next)(action)
			expect(next).toHaveBeenCalledWith(action)
		})
	})

	describe('when it receives an action without a promise payload', () => {
		const action = { type: '@@TEST_ACTION', requestToMake: () => {} }
		test('ignores the action', () => {
			fetchMiddleware(store)(next)(action)
			expect(next).toHaveBeenCalledWith(action)
		})
	})

	describe('when it  receives a valid action', () => {
		describe('and the action promise resolves', () => {
			const action = { 
				type: '@@TEST_ACTION',
				requestToMake: new Promise(r => r([1, 2, 3]))
			}
			test('dispatches the correct actions', async () => {
				await fetchMiddleware(store)(next)(action)
				expect(store.dispatch.mock.calls).toEqual([
					[{ type: 'TEST_ACTION_START' }],
					[{ type: 'TEST_ACTION_RECEIVE', payload: [1, 2, 3]}],
				])
			})
		})

		describe('and the action promise rejects', () => {
			const action = { 
				type: '@@TEST_ACTION',
				requestToMake: new Promise((_, j) => j([1, 2, 3]))
			}
			test('dispatches the correct actions', async () => {
				await fetchMiddleware(store)(next)(action)
				expect(store.dispatch.mock.calls).toEqual([
					[{ type: 'TEST_ACTION_START' }],
					[{ type: 'TEST_ACTION_ERROR', payload: [1, 2, 3]}],
				])
			})
		})
	})
})
