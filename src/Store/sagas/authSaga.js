import { put } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* authActionSaga(action) {
  yield put(actions.authStart())
  const authData = yield {
    username: action.userName,
    password: action.password,
  }
  try {
    const response = yield axios.post('/login/', authData)
    const userName = yield response.data.username
    const userId = yield response.data.id
    const isStaff = yield response.data.is_staff
    const token = yield response.data.token
    yield localStorage.setItem('username', userName)
    yield localStorage.setItem('id', userId)
    yield localStorage.setItem('isStaff', isStaff)
    yield localStorage.setItem('token', token)
    yield axios.defaults.headers.common.Authorization = `Token ${token}`
    yield put(actions.authSuccess(userName, userId, isStaff))
  } catch (error) {
    yield put(actions.authFail(error.response.data))
  }
}

export function* getUsersSaga() {
  try {
    const response = yield axios.get('/users/')
    yield put(actions.getMarkupUsers(response.data.results))
  } catch (error) {
    yield put(actions.getUsersFail())
  }
}

export function* addNewUserSaga(action) {
  try {
    yield axios.post('/users/', action.data)
  } catch (error) {
    console.log(error)
  }
}

export function* authCheckSaga() {
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.logout())
  } else {
    const userName = yield localStorage.getItem('username')
    const userId = yield +localStorage.getItem('id')
    const isStaffStorage = yield localStorage.getItem('isStaff')
    const isStaff = isStaffStorage !== 'false'
    yield axios.defaults.headers.common.Authorization = `Token ${token}`
    yield put(actions.authSuccess(userName, userId, isStaff))
  }
}

export function* authLogoutSaga() {
  yield localStorage.removeItem('username')
  yield localStorage.removeItem('id')
  yield localStorage.removeItem('isStaff')
  yield localStorage.removeItem('token')
}
