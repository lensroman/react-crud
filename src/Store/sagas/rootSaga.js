import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {authActionSaga, getUsersSaga} from './authSaga';
import {addDataSetSaga, deleteDataSetSaga, fetchDataSetsSaga} from './datasetsSaga';
import {addAdminTaskSaga, deleteAdminTaskSaga, fetchAdminTasksSaga, getTaskInfoSaga} from './tasksSaga'

export function* watchAuthSaga() {
    yield takeEvery(actionTypes.AUTH_USER, authActionSaga)
    yield takeEvery(actionTypes.GET_USERS, getUsersSaga)
}

export function* watchDataSetsSaga() {
    yield takeEvery(actionTypes.FETCH_DATASETS, fetchDataSetsSaga)
    yield takeEvery(actionTypes.ADD_DATASET, addDataSetSaga)
    yield takeEvery(actionTypes.DELETE_DATASET, deleteDataSetSaga)
}

export function* watchAdminTasksSaga() {
    yield takeEvery(actionTypes.FETCH_ADMIN_TASKS, fetchAdminTasksSaga)
    yield takeEvery(actionTypes.ADD_ADMIN_TASK, addAdminTaskSaga)
    yield takeEvery(actionTypes.DELETE_ADMIN_TASK, deleteAdminTaskSaga)
    yield takeEvery(actionTypes.GET_TASK_INFO, getTaskInfoSaga)
}