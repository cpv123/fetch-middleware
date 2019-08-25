Simple redux middleware to make fetching data more consistent - each request will dispatch a `START` action, along with either a `RECEIVE` or `ERROR`.

Actions named with an `@@` prefix will be handled by this middleware; an optional helper function is provided to ensure that the actions intended for this middleware are formatted correctly.

```js
// using the fetchAction helper function
const getData = () => fetchAction('GET_DATA', fetch(url))

// or manually formatting the action
const getData = () => ({
  type: '@@GET_DATA',
  requestToMake: fetch(url),
})

export default connect(null, { getData })(Child)
```

```js
// example reducer for the above

const actionHandlers = {
  'GET_DATA_START': (state) => ({
		...state,
		isLoading: true,
	}),
	'GET_DATA_RECEIVE': (state, action) => ({
		...state,
		isLoading: false,
		data: action.payload,
	}),
	'GET_DATA_ERROR': (state) => ({
		...state,
		isLoading: false,
		isError: true,
	}),
}
```
