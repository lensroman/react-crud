import * as actionTypes from './actionTypes';

export const authUserStart = (userName, password) => {
    return {
        type: actionTypes.AUTH_USER_START,
        userName: userName,
        password: password
    }
}

export const authUserSuccess = (userName, password, isStaff) => {
    return {
        type: actionTypes.AUTH_USER_SUCCESS,
        userName: userName,
        password: password,
        isStaff: isStaff
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT_USER
    }
}

export const getDataSets = () => {
    return {
        type: actionTypes.GET_DATASETS
    }
}