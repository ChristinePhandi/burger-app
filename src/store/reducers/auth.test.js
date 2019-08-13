import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
	it('should return initialState if it has no state/action passed as arguments', () => {
		expect(reducer(undefined, {})).toEqual({
			token : null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/'
		});
	});

	it('should store token when login', () => {
		expect(reducer({
			token : null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/'
		}, {
			type: actionTypes.AUTH_SUCCESS,
			idToken : 'PASStoken',
			userId: 'PASSid'
		})).toEqual({
			token : 'PASStoken',
			userId: 'PASSid',
			error: null,
			loading: false,
			authRedirectPath: '/'
		});
	});

});