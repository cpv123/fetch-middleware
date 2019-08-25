import { fetchAction } from '..' 

describe('the fetchAction function', () => {
  test('returns an action of the correct form', () => {
		const promise = new Promise(r => r())
		expect(fetchAction('TEST_ACTION', promise)).toEqual({
			type: '@@TEST_ACTION',
			requestToMake: promise,
		})
  })  
})
