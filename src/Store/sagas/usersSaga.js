import { delay, put } from 'redux-saga/effects'

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* fetchUsersSaga(action) {
  try {
    const response = yield axios.get('/users/', {
      params: {
        limit: action.page.limit,
        offset: action.page.offset,
      },
    })
    yield put(actions.fetchUsersSuccess(response.data.count, response.data.results))
  } catch (error) {
    console.log(error)
    yield put(actions.fetchUsersFail(error))
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}

export function* fetchAllUsersSaga() {
  try {
    const response = yield axios.get('/users/', {
      params: {
        limit: 1,
        offset: 0,
      },
    })
    const fullResponse = yield axios.get('/users/', {
      params: {
        limit: response.data.count,
        offset: 0,
      },
    })
    yield put(actions.fetchUsersSuccess(fullResponse.data.count, fullResponse.data.results))
  } catch (error) {
    yield put(actions.fetchUsersFail(error))
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}

export function* addNewUserSaga(action) {
  try {
    yield axios.post('/users/', action.data)
    yield put(actions.addNewUserSuccess())
    yield delay(3500)
    yield put(actions.cleanErrors())
    yield put(actions.fetchUsers(action.page))
  } catch (error) {
    yield put(actions.addNewUserFail())
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}

export function* deleteUserSaga(action) {
  try {
    yield axios.delete(`/users/${action.id}/`)
    yield put(actions.fetchUsers(action.page))
  } catch (error) {
    console.log(error)
  }
}
