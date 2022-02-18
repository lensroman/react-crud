import * as actionTypes from './actionTypes';

export const addNewUser = (data) => ({
  type: actionTypes.ADD_NEW_USER,
  data,
})

export const addNewUserSuccess = () => ({
  type: actionTypes.ADD_NEW_USER_SUCCESS,
})

export const addNewUserFail = (error) => ({
  type: actionTypes.ADD_NEW_USER_FAIL,
  error,
})

export const getUsers = () => ({
  type: actionTypes.GET_USERS,
})

export const getUsersSuccess = (users) => ({
  type: actionTypes.GET_USERS_SUCCESS,
  users,
})

export const getUsersFail = (error) => ({
  type: actionTypes.GET_USERS_FAIL,
  error,
})
