import * as actionTypes from './actionTypes';

export const addNewUser = (data, page) => ({
  type: actionTypes.ADD_NEW_USER,
  data,
  page,
})

export const addNewUserSuccess = () => ({
  type: actionTypes.ADD_NEW_USER_SUCCESS,
})

export const addNewUserFail = (error) => ({
  type: actionTypes.ADD_NEW_USER_FAIL,
  error,
})

export const fetchUsers = (page) => ({
  type: actionTypes.FETCH_USERS,
  page,
})

export const fetchAllUsers = () => ({
  type: actionTypes.FETCH_ALL_USERS,
})

export const fetchUsersSuccess = (count, users) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  count,
  users,
})

export const fetchUsersFail = (error) => ({
  type: actionTypes.FETCH_USERS_FAIL,
  error,
})

export const deleteUser = (id, page) => ({
  type: actionTypes.DELETE_USER,
  id,
  page,
})
