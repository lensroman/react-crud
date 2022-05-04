import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {
  authActionSaga, authCheckSaga, authLogoutSaga,
} from './authSaga';
import {
  addDataSetSaga,
  deleteDataSetSaga,
  fetchAllDatasetsSaga,
  fetchDataSetsSaga,
  getDatasetInfoSaga,
  uploadDatasetSaga,
  fetchImagesNamesSaga,
} from './datasetsSaga';
import {
  addAdminTaskSaga, closeTaskSaga,
  competeTaskSaga,
  deleteAdminTaskSaga,
  fetchAdminTasksSaga,
  getTaskInfoSaga, openTaskSaga,
} from './tasksSaga'
import { addCommentSaga, deleteCommentSaga, fetchCommentsSaga } from './commentsSaga';
import {
  addNewUserSaga, deleteUserSaga, fetchAllUsersSaga, fetchUsersSaga,
} from './usersSaga'

export function* watchAuthSaga() {
  yield takeEvery(actionTypes.AUTH_USER, authActionSaga)
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
  yield takeEvery(actionTypes.FETCH_IMAGES_NAMES, fetchImagesNamesSaga)
}

export function* watchAdminTasksSaga() {
  yield takeEvery(actionTypes.FETCH_ADMIN_TASKS, fetchAdminTasksSaga)
  yield takeEvery(actionTypes.ADD_ADMIN_TASK, addAdminTaskSaga)
  yield takeEvery(actionTypes.DELETE_ADMIN_TASK, deleteAdminTaskSaga)
  yield takeEvery(actionTypes.GET_TASK_INFO, getTaskInfoSaga)
  yield takeEvery(actionTypes.COMPLETE_TASK, competeTaskSaga)
  yield takeEvery(actionTypes.CLOSE_TASK, closeTaskSaga)
  yield takeEvery(actionTypes.OPEN_TASK, openTaskSaga)
}

export function* watchCommentsSaga() {
  yield takeEvery(actionTypes.FETCH_COMMENTS, fetchCommentsSaga)
  yield takeEvery(actionTypes.ADD_COMMENT, addCommentSaga)
  yield takeEvery(actionTypes.DELETE_COMMENT, deleteCommentSaga)
}

export function* watchUsersSaga() {
  yield takeEvery(actionTypes.FETCH_USERS, fetchUsersSaga)
  yield takeEvery(actionTypes.FETCH_ALL_USERS, fetchAllUsersSaga)
  yield takeEvery(actionTypes.ADD_NEW_USER, addNewUserSaga)
  yield takeEvery(actionTypes.DELETE_USER, deleteUserSaga)
}
