import * as actionTypes from '../actions/actionTypes';

import axios from '../../axios-auth';

const initialState = {
    loading: false,
    isAuthenticated: false,
    userName: null,
    password: null,
    isStaff: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_USER_START: {
            axios({
                method: 'post',
                url: '/login/',
                data: {
                    "username": action.userName,
                    "password": action.password
                }
            }).then((response) => {
                console.log('login', response)
                console.log(response.headers['date'])
            }).catch((error) => {
                console.log(error)
            })
            return {
                ...state
            }
        }
        case actionTypes.GET_DATASETS: {
            return {
                ...state
            }
        }
        case actionTypes.AUTH_USER_SUCCESS: {
            return {
                ...state,
                userName: action.userName,
                password: action.password,
                isStaff: action.isStaff,
                isAuthenticated: true
            }
        }
        case actionTypes.LOGOUT_USER: {
            return {
                ...state,
                email: null,
                password: null,
                isAuthenticated: false,
                userType: null
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