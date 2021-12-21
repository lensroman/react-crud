import * as actionTypes from './actionTypes';

export const auth = (email, password) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password
    }
}