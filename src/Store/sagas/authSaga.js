import { put } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* authActionSaga(action) {
    yield put(actions.authStart())
    const authData = yield {
        username: action.userName,
        password: action.password
    }
    try {
        const response = yield axios.post('/login/', authData)
        console.log(response)
        const userName = yield response.data.username
        const userId = yield response.data.id
        const isStaff = yield response.data.is_staff
        yield axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
        yield put(actions.authSuccess(userName, userId, isStaff))
    }
    catch(error) {
        yield put(actions.authFail(error))
    }
}