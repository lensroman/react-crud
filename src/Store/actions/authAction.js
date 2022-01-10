import * as actionTypes from './actionTypes';

export const authAction = (userName, password) => {
    return {
        type: actionTypes.AUTH_USER,
        userName: userName,
        password: password
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (userName, userId, isStaff) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userName: userName,
        userId: userId,
        isStaff: isStaff
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
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