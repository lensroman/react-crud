import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    userId: null,
    userName: null,
    isStaff: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: {
            return {
                ...state,
                error: null,
                loading: true
            }
        }
        case actionTypes.AUTH_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userId: action.userId,
                userName: action.userName,
                isStaff: action.isStaff
            }
        }
        case actionTypes.AUTH_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case actionTypes.LOGOUT_USER: {
            return {
                ...state,
                loading: false,
                error: null,
                isAuthenticated: false,
                userId: null,
                userName: null,
                isStaff: null
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;