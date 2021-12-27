import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    isAuthenticated: false,
    email: null,
    password: null,
    userType: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_USER: {
            // request to server. Get userType
            let email = action.email
            let password = action.password
            return {
                ...state,
                email: email,
                password: password,
                userType: 'markup',
                isAuthenticated: true
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