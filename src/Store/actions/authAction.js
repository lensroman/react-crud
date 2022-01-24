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

export const authFail = error => {
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

export const getUsers = () => {
    return {
        type: actionTypes.GET_USERS
    }
}

export const getMarkupUsers = users => {
    return {
        type: actionTypes.GET_MARKUP_USERS,
        users: users
    }
}

export const getUsersFail = error => {
    return {
        type: actionTypes.GET_USERS_FAIL,
        error: error
    }
}

export const addNewUser = data => {
    return {
        type: actionTypes.ADD_NEW_USER,
        data: data
    }
}

export const authCheck = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}