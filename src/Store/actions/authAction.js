import * as actionTypes from './actionTypes';

export const authAction = (userName, password) => ({
  type: actionTypes.AUTH_USER,
  userName,
  password,
})

export const authStart = () => ({
  type: actionTypes.AUTH_START,
})

export const authSuccess = (userName, userId, isStaff) => ({
  type: actionTypes.AUTH_SUCCESS,
  userName,
  userId,
  isStaff,
})

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
})

export const logout = () => ({
  type: actionTypes.LOGOUT_USER,
})

export const getUsers = () => ({
  type: actionTypes.GET_USERS,
})

export const getMarkupUsers = (users) => ({
  type: actionTypes.GET_MARKUP_USERS,
  users,
})

export const getUsersFail = (error) => ({
  type: actionTypes.GET_USERS_FAIL,
  error,
})

export const addNewUser = (data) => ({
  type: actionTypes.ADD_NEW_USER,
  data,
})

export const authCheck = () => ({
  type: actionTypes.AUTH_CHECK_STATE,
})
