import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {addNewUserSaga, authActionSaga, authCheckSaga, authLogoutSaga, getUsersSaga} from './authSaga';
import {
    addDataSetSaga,
    deleteDataSetSaga,
    fetchAllDatasetsSaga,
    fetchDataSetsSaga,
    getDatasetInfoSaga,
    uploadDatasetSaga
} from './datasetsSaga';
import {
    addAdminTaskSaga,
    competeTaskSaga,
    deleteAdminTaskSaga,
    fetchAdminTasksSaga,
    getTaskInfoSaga
} from './tasksSaga'
import {addCommentSaga, deleteCommentSaga, fetchCommentsSaga} from "./commentsSaga";

export function* watchAuthSaga() {
    yield takeEvery(actionTypes.AUTH_USER, authActionSaga)
    yield takeEvery(actionTypes.GET_USERS, getUsersSaga)
    yield takeEvery(actionTypes.ADD_NEW_USER, addNewUserSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckSaga)
    yield takeEvery(actionTypes.LOGOUT_USER, authLogoutSaga)
}

export function* watchDataSetsSaga() {
    yield takeEvery(actionTypes.FETCH_ALL_DATASETS, fetchAllDatasetsSaga)
    yield takeEvery(actionTypes.FETCH_DATASETS, fetchDataSetsSaga)
    yield takeEvery(actionTypes.ADD_DATASET, addDataSetSaga)
    yield takeEvery(actionTypes.DELETE_DATASET, deleteDataSetSaga)
    yield takeEvery(actionTypes.GET_DATASET_INFO, getDatasetInfoSaga)
    yield takeEvery(actionTypes.UPLOAD_DATASET, uploadDatasetSaga)
}

export function* watchAdminTasksSaga() {
    yield takeEvery(actionTypes.FETCH_ADMIN_TASKS, fetchAdminTasksSaga)
    yield takeEvery(actionTypes.ADD_ADMIN_TASK, addAdminTaskSaga)
    yield takeEvery(actionTypes.DELETE_ADMIN_TASK, deleteAdminTaskSaga)
    yield takeEvery(actionTypes.GET_TASK_INFO, getTaskInfoSaga)
    yield takeEvery(actionTypes.COMPLETE_TASK, competeTaskSaga)
}

export function* watchCommentsSaga() {
    yield takeEvery(actionTypes.FETCH_COMMENTS, fetchCommentsSaga)
    yield takeEvery(actionTypes.ADD_COMMENT, addCommentSaga)
    yield takeEvery(actionTypes.DELETE_COMMENT, deleteCommentSaga)
}