import apiClient from 'services/apiClient';

export default function reduxPromiseMiddleware({getState, dispatch}) {
	return next => action => {
		const { promise, types, type, ...rest } = action;
		if (!promise) {
			return next(action);
		}
		let REQUEST;
    let SUCCESS;
    let FAILURE;
    if (type) {
      REQUEST = SUCCESS = FAILURE = type;
    }
    if (types && types.length === 3) {
      [REQUEST, SUCCESS, FAILURE] = types;
    }

		next({ ...rest, type: REQUEST });
		return promise({getState, dispatch, client: apiClient}).then(
			result => next({ ...rest, result, type: SUCCESS }),
			error => next({ ...rest, error, type: FAILURE })
		);
	};
}
