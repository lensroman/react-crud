import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {authActionSaga} from './authSaga';
import {addDataSetSaga, deleteDataSetSaga, fetchDataSetsSaga} from './dataSetsSaga';

export function* watchAuthSaga() {
    yield takeEvery(actionTypes.AUTH_USER, authActionSaga)
}

export function* watchDataSetsSaga() {
    yield takeEvery(actionTypes.FETCH_DATASETS, fetchDataSetsSaga)
    yield takeEvery(actionTypes.ADD_DATASET, addDataSetSaga)
    yield takeEvery(actionTypes.DELETE_DATASET, deleteDataSetSaga)
}