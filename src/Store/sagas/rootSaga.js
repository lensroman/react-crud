import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {authActionSaga} from './authSaga';
import {fetchDatasetsSaga} from './datasetsSaga';

export function* watchAuthSaga() {
    yield takeEvery(actionTypes.AUTH_USER, authActionSaga)
}

export function* watchDatasetsSaga() {
    yield takeEvery(actionTypes.FETCH_DATASETS, fetchDatasetsSaga)
}