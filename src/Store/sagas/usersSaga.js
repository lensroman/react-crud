import { delay, put } from 'redux-saga/effects'

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* getUsersSaga() {
  try {
    const response = yield axios.get('/users/')
    yield put(actions.getUsersSuccess(response.data.results))
  } catch (error) {
    yield put(actions.getUsersFail(error))
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
    yield put(actions.getUsers())
  } catch (error) {
    yield put(actions.addNewUserFail())
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}
